import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Administrateur } from '../administrateur/entities/administrateur.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Administrateur)
    private administrateurRepository: Repository<Administrateur>,
  ) { }

  async onModuleInit() {
    try {
      const userRepository = this.administrateurRepository.manager.getRepository('user');
      await userRepository.update({ role: 'Etudiant' }, { role: 'etudiant' });
      await userRepository.update({ role: 'User' }, { role: 'etudiant' });
      await userRepository.update({ role: 'Administrateur' }, { role: 'administrateur' });
      await userRepository.update({ role: 'Professeur' }, { role: 'professeur' });
      await userRepository.update({ role: 'ChefDepartement' }, { role: 'chefDepartement' });
      console.log('✅ Synchronized all user roles to TypeORM ChildEntity casing');
    } catch (e) {
      console.error('⚠️ Failed to synchronize user roles:', e.message);
    }

    await this.seedDefaultAdmin();
    await this.seedStudents();
  }

  private async seedDefaultAdmin() {
    const adminEmail = 'admin.iset@gmail.com';

    // Check if admin already exists by email across all users (bypassing role discriminator)
    const userRepository = this.administrateurRepository.manager.getRepository('user');
    const existingAdmin = await userRepository.findOne({
      where: { email: adminEmail },
    });

    if (!existingAdmin) {
      const defaultAdmin = this.administrateurRepository.create({
        fullname: 'Administrateur ISET',
        email: adminEmail,
        password: 'admin123',
        role: 'administrateur',
      });

      await this.administrateurRepository.save(defaultAdmin);
      console.log('✅ Default admin account created:');
      console.log('   Email: admin.iset@gmail.com');
      console.log('   Password: admin123');
    } else {
      // Migrate existing admin to lowercase role if it was uppercase
      if (existingAdmin.role === 'Administrateur') {
        await userRepository.update({ id: existingAdmin.id }, { role: 'administrateur' });
        console.log('✅ Existing admin migrated to lowercase role');
      } else {
        console.log('ℹ️ Default admin account already exists');
      }
    }
  }

  private async seedStudents() {
    const departementRepository = this.administrateurRepository.manager.getRepository('Departement');
    const classeRepository = this.administrateurRepository.manager.getRepository('classe');
    const userRepository = this.administrateurRepository.manager.getRepository('user');
    const inscriptionRepository = this.administrateurRepository.manager.getRepository('inscription');

    // 1. Trouver ou créer le département "Informatique"
    let departement = await departementRepository.findOne({ where: { code: 'INFO' } });
    if (!departement) {
      departement = departementRepository.create({
        code: 'INFO',
        nom: 'Informatique',
        description: 'Département des Technologies de l\'Informatique',
      });
      departement = await departementRepository.save(departement);
      console.log('✅ Département Informatique créé');
    }

    // 2. Trouver ou créer les classes "TI11" et "TI12"
    let classeTI11 = await classeRepository.findOne({ where: { nom: 'TI11' } });
    if (!classeTI11) {
      classeTI11 = classeRepository.create({
        nom: 'TI11',
        niveau: '1',
        departement: departement,
      });
      classeTI11 = await classeRepository.save(classeTI11);
      console.log('✅ Classe TI11 créée');
    }

    let classeTI12 = await classeRepository.findOne({ where: { nom: 'TI12' } });
    if (!classeTI12) {
      classeTI12 = classeRepository.create({
        nom: 'TI12',
        niveau: '1',
        departement: departement,
      });
      classeTI12 = await classeRepository.save(classeTI12);
      console.log('✅ Classe TI12 créée');
    }

    // 3. Noms réalistes tunisiens pour TI11 (25 étudiants)
    const firstNamesTI11 = [
      'ali', 'salma', 'omar', 'rim', 'youssef', 'sirine', 'ahmed', 'nour', 'mohamed', 'farah',
      'khalil', 'malek', 'hamza', 'eya', 'skander', 'meriam', 'yassine', 'ameni', 'anis', 'hadir',
      'sami', 'zeineb', 'hassen', 'tasnim', 'chaker'
    ];
    const lastNamesTI11 = [
      'benali', 'trabelsi', 'dridi', 'karoui', 'ellouze', 'sellami', 'ghorbel', 'rekik', 'chaabane', 'louati',
      'bouazizi', 'mabrouk', 'ayadi', 'jaidane', 'mansour', 'kallel', 'fakhfakh', 'abid', 'belhaj', 'chafai',
      'gargouri', 'haddad', 'jemal', 'mezghani', 'snoussi'
    ];

    // 4. Noms réalistes tunisiens pour TI12 (25 étudiants)
    const firstNamesTI12 = [
      'adem', 'boutheina', 'cherif', 'dorra', 'emna', 'firas', 'ghada', 'haithem', 'ines', 'jihed',
      'khaled', 'leila', 'marouane', 'nadia', 'oussama', 'raouf', 'sabrine', 'tarek', 'wael', 'yosr',
      'zied', 'fatma', 'houssem', 'lobna', 'nizar'
    ];
    const lastNamesTI12 = [
      'amri', 'belaid', 'chebbi', 'daoud', 'essafi', 'ferchichi', 'guidara', 'hamdi', 'ismail', 'jallouli',
      'koubaa', 'latiri', 'mhedhbi', 'nafti', 'ouali', 'riahi', 'saidi', 'tlili', 'werghemi', 'youssef',
      'zribi', 'boussaid', 'chouchene', 'drira', 'maalej'
    ];

    const registerStudentsList = async (firstNames: string[], lastNames: string[], targetClasse: any, baseCin: number, baseMatricule: number) => {
      for (let i = 0; i < 25; i++) {
        const fName = firstNames[i];
        const lName = lastNames[i];
        const username = `${fName}.${lName}`;
        const email = `${username}@gmail.com`;
        const password = `${username}123`;
        const fullname = `${fName.charAt(0).toUpperCase() + fName.slice(1)} ${lName.charAt(0).toUpperCase() + lName.slice(1)}`;
        const cin = baseCin + i;
        const matricule = baseMatricule + i;

        let user = await userRepository.findOne({ where: { email } });
        if (!user) {
          // Créer l'utilisateur avec le rôle etudiant
          user = userRepository.create({
            fullname,
            email,
            password, // Sera haché automatiquement par @BeforeInsert dans user.entity
            role: 'etudiant',
            departementId: departement.id,
          });
          user = await userRepository.save(user);
          console.log(`👤 Étudiant ${fullname} créé`);
        }

        // Vérifier si une inscription existe déjà pour cet utilisateur
        const existingInscription = await inscriptionRepository.findOne({
          where: { user: { id: user.id } },
        });

        if (!existingInscription) {
          const inscription = inscriptionRepository.create({
            cin,
            matricule_bac: matricule,
            niveau: '1',
            departement: departement,
            classe: targetClasse,
            user: user,
          });
          await inscriptionRepository.save(inscription);
          console.log(`📝 Inscription créée pour ${fullname} dans ${targetClasse.nom}`);
        }
      }
    };

    console.log('⏳ Début de l\'inscription des 25 étudiants pour TI11...');
    await registerStudentsList(firstNamesTI11, lastNamesTI11, classeTI11, 11111000, 20261100);

    console.log('⏳ Début de l\'inscription des 25 étudiants pour TI12...');
    await registerStudentsList(firstNamesTI12, lastNamesTI12, classeTI12, 22222000, 20261200);

    console.log('✅ Seeding complet des 50 étudiants (TI11 & TI12) terminé !');
  }

}
