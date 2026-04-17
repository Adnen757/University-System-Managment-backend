import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInscriptionDto } from './dto/create-inscription.dto';
import { UpdateInscriptionDto } from './dto/update-inscription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inscription } from './entities/inscription.entity';
import { Departement } from 'src/departement/entities/departement.entity';
import { Classe } from 'src/classe/entities/classe.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InscriptionService {

  // Mapping des départements vers les préfixes de classes
  private readonly departementPrefixes: { [key: string]: string } = {
    'Informatique': 'TI',
    'Génie Mécanique': 'GE',
    'Génie Électrique': 'ZU',
    'Génie des Procédés': 'ER'
  };

  constructor(
    @InjectRepository(Inscription) private inscriptionRepository: Repository<Inscription>,
    @InjectRepository(Departement) private departementRepository: Repository<Departement>,
    @InjectRepository(Classe) private classeRepository: Repository<Classe>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {
  }





 async create(createInscriptionDto: CreateInscriptionDto, photos?: string[]):Promise<Inscription> {
    const { departementId, userId, cin, matricule_bac, matriculeBac, ...rest } = createInscriptionDto;
    const matriculeBacValue = matricule_bac ?? matriculeBac;
    
    // Convertir les strings en nombres si nécessaire
    const inscription = this.inscriptionRepository.create({
      ...rest,
      cin: typeof cin === 'string' ? parseInt(cin) : cin,
      matricule_bac: typeof matriculeBacValue === 'string' ? parseInt(matriculeBacValue) : matriculeBacValue,
    });
    
    // Associer l'utilisateur
    if (userId) {
      const userIdNum = typeof userId === 'string' ? parseInt(userId) : userId;
      const user = await this.userRepository.findOneBy({ id: userIdNum });
      if (!user) {
        throw new NotFoundException(`Utilisateur avec id ${userId} non trouvé`);
      }
      inscription.user = user;
    }
    
    // Ajouter les photos si fournies
    if (photos && photos.length > 0) {
      inscription.photos = photos;
    }
    
    if (departementId) {
      const departementIdNum = typeof departementId === 'string' ? parseInt(departementId) : departementId;
      const departement = await this.departementRepository.findOneBy({ id: departementIdNum });
      if (!departement) {
        throw new NotFoundException(`Departement avec id ${departementId} non trouvé`);
      }
      inscription.departement = departement;
      
      // Affectation automatique à une classe
      inscription.classe = await this.assignerClasse(departement);
    }
    
    return this.inscriptionRepository.save(inscription);
  }

  private async assignerClasse(departement: Departement): Promise<Classe> {
    const prefix = this.departementPrefixes[departement.nom];
    if (!prefix) {
      throw new NotFoundException(`Préfixe de classe non défini pour le département: ${departement.nom}`);
    }

    // Récupérer toutes les classes du département avec le préfixe (1ère année)
    const classes = await this.classeRepository.find({
      where: { 
        departement: { id: departement.id },
        niveau: '1ère année'
      },
      relations: ['inscriptions'],
      order: { nom: 'ASC' }
    });

    // Chercher la première classe avec moins de 25 étudiants
    for (const classe of classes) {
      const nbEtudiants = classe.inscriptions ? classe.inscriptions.length : 0;
      if (nbEtudiants < 25) {
        return classe;
      }
    }

    // Si toutes les classes sont pleines, créer une nouvelle classe
    const numeroClasse = classes.length + 1;
    const nomClasse = `${prefix}1${numeroClasse}`;
    
    const nouvelleClasse = this.classeRepository.create({
      nom: nomClasse,
      niveau: '1ère année',
      departement: departement
    });
    
    return this.classeRepository.save(nouvelleClasse);
  }




 async findAll(): Promise<Inscription[]> {
    const inscriptions = await this.inscriptionRepository.find({ relations: ['departement', 'classe'] });
    if (inscriptions.length === 0) {
      throw new NotFoundException("data not found");
    }
    return inscriptions;
  }





 async findOne(id: number): Promise<Inscription> {
    const inscription = await this.inscriptionRepository.findOne({
      where: { id },
      relations: ['departement', 'classe']
    });
    if (!inscription) {
      throw new NotFoundException("inscription not found");
    }
    return inscription;
  }




async update(id: number, updateInscriptionDto: UpdateInscriptionDto): Promise<Inscription> {
    const inscription = await this.inscriptionRepository.findOne({ 
      where: { id },
      relations: ['departement', 'classe']
    });
    if (!inscription) {
      throw new NotFoundException("inscription not found");
    }
    
    const { departementId, ...rest } = updateInscriptionDto;
    
    if (departementId !== undefined) {
      if (departementId === null) {
        inscription.departement = null;
        inscription.classe = null;
      } else {
        const departementIdNum = typeof departementId === 'string' ? parseInt(departementId) : departementId;
        const departement = await this.departementRepository.findOneBy({ id: departementIdNum });
        if (!departement) {
          throw new NotFoundException(`Departement avec id ${departementIdNum} non trouvé`);
        }
        inscription.departement = departement;
        // Réaffectation automatique à une classe du nouveau département
        inscription.classe = await this.assignerClasse(departement);
      }
    }
    
    Object.assign(inscription, rest);
    return this.inscriptionRepository.save(inscription);
  }






async  remove(id: number) {
              const inscription =await this.inscriptionRepository.findOneBy({id})
if(!inscription){
  throw new NotFoundException("inscription not found")
 
}
 await this.inscriptionRepository.delete(id)
 return id
  }
}
