import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Administrateur } from '../administrateur/entities/administrateur.entity';
import { Departement } from '../departement/entities/departement.entity';
import { Classe } from '../classe/entities/classe.entity';
import { Etudiant } from '../etudiant/entities/etudiant.entity';
import { Inscription } from '../inscription/entities/inscription.entity';
import { Professeur } from '../professeur/entities/professeur.entity';
import { Matiere } from '../matiere/entities/matiere.entity';
import { Evaluation, EvaluationType } from '../evaluation/entities/evaluation.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Administrateur)
    private administrateurRepository: Repository<Administrateur>,
    @InjectRepository(Departement)
    private departementRepository: Repository<Departement>,
    @InjectRepository(Classe)
    private classeRepository: Repository<Classe>,
    @InjectRepository(Etudiant)
    private etudiantRepository: Repository<Etudiant>,
    @InjectRepository(Inscription)
    private inscriptionRepository: Repository<Inscription>,
    @InjectRepository(Professeur)
    private professeurRepository: Repository<Professeur>,
    @InjectRepository(Matiere)
    private matiereRepository: Repository<Matiere>,
    @InjectRepository(Evaluation)
    private evaluationRepository: Repository<Evaluation>,
  ) {}

  async onModuleInit() {
    await this.seedDefaultAdmin();
    await this.seedClassesAndStudents();
    await this.seedProfessors();
  }

  private async seedDefaultAdmin() {
    const adminEmail = 'admin.iset@gmail.com';
    
    // Check if admin already exists
    const existingAdmin = await this.administrateurRepository.findOne({
      where: { email: adminEmail },
    });

    if (!existingAdmin) {
      const defaultAdmin = this.administrateurRepository.create({
        fullname: 'Administrateur ISET',
        email: adminEmail,
        password: 'admin123',
        role: 'Administrateur',
      });

      await this.administrateurRepository.save(defaultAdmin);
      console.log('✅ Default admin account created:');
      console.log('   Email: admin.iset@gmail.com');
      console.log('   Password: admin123');
    } else {
      console.log('ℹ️ Default admin account already exists');
    }
  }

  private async seedClassesAndStudents() {
    // 1. Ensure a department exists
    let dept = await this.departementRepository.findOne({ where: { code: 'IT' } });
    if (!dept) {
      dept = this.departementRepository.create({
        code: 'IT',
        nom: 'Technologies de l\'Informatique',
        description: 'Département informatique',
      });
      dept = await this.departementRepository.save(dept);
      console.log('✅ Created IT Department');
    }

    const classesToCreate = [
      { nom: 'DSI21', niveau: '2ème année' },
      { nom: 'RSI21', niveau: '2ème année' },
      { nom: 'DSI31', niveau: '3ème année' },
      { nom: 'RSI31', niveau: '3ème année' },
    ];

    for (const classData of classesToCreate) {
      let classe = await this.classeRepository.findOne({ where: { nom: classData.nom } });
      if (!classe) {
        classe = this.classeRepository.create({
          ...classData,
          departement: dept,
          departementId: dept.id,
        });
        classe = await this.classeRepository.save(classe);
        console.log(`✅ Created Class: ${classe.nom}`);

        // Add 2 students to each class
        for (let i = 1; i <= 2; i++) {
          const studentEmail = `student.${classe.nom.toLowerCase()}.${i}@example.com`;
          let student = await this.etudiantRepository.findOne({ where: { email: studentEmail } });
          
          if (!student) {
            student = this.etudiantRepository.create({
              fullname: `Étudiant ${i} ${classe.nom}`,
              email: studentEmail,
              password: 'password123',
              role: 'Etudiant',
              departementId: dept.id,
            });
            student = await this.etudiantRepository.save(student);

            // Create inscription
            const inscription = this.inscriptionRepository.create({
              user: student,
              classe: classe,
              departement: dept,
              cin: 12345678 + i,
              matricule_bac: 20240000 + i,
              niveau: classe.niveau,
            });
            await this.inscriptionRepository.save(inscription);
            console.log(`   ✅ Created Student: ${student.fullname} and enrolled in ${classe.nom}`);
          }
        }
      } else {
        const studentCount = await this.inscriptionRepository.count({ where: { classe: { id: classe.id } } });
        console.log(`ℹ️ Class ${classe.nom} already exists with ${studentCount} students`);
      }
    }
  }

  private async seedProfessors() {
    let dept = await this.departementRepository.findOne({ where: { code: 'IT' } });
    if (!dept) return;

    const profEmail = 'prof.it@example.com';
    let prof = await this.professeurRepository.findOne({ where: { email: profEmail } });

    if (!prof) {
      prof = this.professeurRepository.create({
        fullname: 'Professeur IT',
        email: profEmail,
        password: 'profpassword123',
        role: 'Professeur',
        departementId: dept.id,
        ChargeHoraireSemestrielle: '192',
        matiere: 'Web Development',
      });
      prof = await this.professeurRepository.save(prof);
      console.log('✅ Created Professor: Professeur IT (prof.it@example.com / profpassword123)');

      // Create a Matiere and link to classes and this professor
      const classes = await this.classeRepository.find();
      if (classes.length > 0) {
        let matiere = await this.matiereRepository.findOne({ where: { code: 'WEB101' } });
        if (!matiere) {
          matiere = this.matiereRepository.create({
            code: 'WEB101',
            intitule: 'Développement Web',
            coefficient: 1.5,
            creditsECTS: 3,
            departement: dept,
            professeurs: [prof],
            classes: classes,
          });
          matiere = await this.matiereRepository.save(matiere);
          console.log('✅ Created Subject: Développement Web and linked to Professor and Classes');
        }

        // Create an Evaluation for this subject
        const existingEval = await this.evaluationRepository.findOne({ where: { matiereId: matiere.id } });
        if (!existingEval) {
          const evaluation = this.evaluationRepository.create({
            type: EvaluationType.DS,
            date: new Date(),
            coefficient: 1,
            matiere: matiere,
            matiereId: matiere.id,
            semestre: 'S2',
          });
          await this.evaluationRepository.save(evaluation);
          console.log('✅ Created Evaluation for Développement Web');
        }
      }
    } else {
      console.log('ℹ️ Professor prof.it@example.com already exists');
    }
  }
}
