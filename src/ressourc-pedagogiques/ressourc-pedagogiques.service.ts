import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRessourcPedagogiqueDto } from './dto/create-ressourc-pedagogique.dto';
import { UpdateRessourcPedagogiqueDto } from './dto/update-ressourc-pedagogique.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { RessourcPedagogique } from './entities/ressourc-pedagogique.entity';
import { Matiere } from 'src/matiere/entities/matiere.entity';
import { Classe } from 'src/classe/entities/classe.entity';
import { Inscription } from 'src/inscription/entities/inscription.entity';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationType } from 'src/notification/entities/notification.entity';

@Injectable()
export class RessourcPedagogiquesService {

  constructor(
    @InjectRepository(RessourcPedagogique) private ressourcPedagogiqueRepository: Repository<RessourcPedagogique>,
    @InjectRepository(Matiere) private matiereRepository: Repository<Matiere>,
    @InjectRepository(Classe) private classeRepository: Repository<Classe>,
    @InjectRepository(Inscription) private inscriptionRepository: Repository<Inscription>,
    private readonly notificationService: NotificationService
  ) { }



  async create(createRessourcPedagogiqueDto: CreateRessourcPedagogiqueDto): Promise<RessourcPedagogique> {
    const matiere = await this.matiereRepository.findOne({ where: { id: createRessourcPedagogiqueDto.matiereId } })
    if (!matiere) {
      throw new NotFoundException('matiere not found')
    }

    let classe: Classe | null = null;
    if (createRessourcPedagogiqueDto.classeId) {
      classe = await this.classeRepository.findOne({ where: { id: createRessourcPedagogiqueDto.classeId } })
      if (!classe) {
        throw new NotFoundException('classe not found')
      }
    }

    const newressource = this.ressourcPedagogiqueRepository.create({
      ...createRessourcPedagogiqueDto,
      matiere: matiere,
      classe: classe
    })
    const savedRessource = await this.ressourcPedagogiqueRepository.save(newressource);

    // Send notification to all students in the class
    if (classe) {
      try {
        const inscriptions = await this.inscriptionRepository.find({ 
          where: { classe: { id: classe.id } },
          relations: ['user']
        });
        
        for (const insc of inscriptions) {
          if (insc.user) {
            await this.notificationService.create({
              titre: "Nouveau cours ajouté",
              message: `Un nouveau document (${savedRessource.type}) a été ajouté dans la matière ${matiere.intitule} par ${savedRessource.proprietaire}.`,
              type: NotificationType.COURS,
              user: insc.user.id
            });
          }
        }
      } catch (e) {
        console.error('Erreur lors de la notification (create ressource):', e);
      }
    }

    return savedRessource;
  }





  async findAll(): Promise<RessourcPedagogique[]> {
    const ressourcPedagogique = await this.ressourcPedagogiqueRepository.find({ relations: ['matiere', 'classe'] });
    if (ressourcPedagogique.length === 0) {
      throw new NotFoundException("data not found")
    }
    return ressourcPedagogique
  }

  async findByProfesseur(proprietaire: string): Promise<RessourcPedagogique[]> {
    const ressourcPedagogique = await this.ressourcPedagogiqueRepository.find({
      where: { proprietaire },
      relations: ['matiere', 'classe']
    });
    if (ressourcPedagogique.length === 0) {
      throw new NotFoundException("data not found")
    }
    return ressourcPedagogique;
  }

  async findByMatiere(matiereId: number): Promise<RessourcPedagogique[]> {
    const ressourcPedagogique = await this.ressourcPedagogiqueRepository.find({
      where: { matiereId },
      relations: ['matiere', 'classe']
    });
    if (ressourcPedagogique.length === 0) {
      throw new NotFoundException("data not found")
    }
    return ressourcPedagogique;
  }

  async findByClasse(classeId: number): Promise<RessourcPedagogique[]> {
    const ressourcPedagogique = await this.ressourcPedagogiqueRepository.find({
      where: [
        { classeId: classeId },
        { classeId: null } // On inclut aussi les ressources générales (sans classe spécifique)
      ],
      relations: ['matiere', 'classe']
    });
    return ressourcPedagogique;
  }





  async findOne(id: number): Promise<RessourcPedagogique> {
    const ressourcPedagogique = await this.ressourcPedagogiqueRepository.findOne({
      where: { id },
      relations: ['matiere', 'classe']
    })
    if (!ressourcPedagogique) {
      throw new NotFoundException("ressourcPedagogique not found")
    }
    return ressourcPedagogique
  }





  async update(id: number, updateRessourcPedagogiqueDto: UpdateRessourcPedagogiqueDto): Promise<RessourcPedagogique> {
    const ressourcPedagogique = await this.ressourcPedagogiqueRepository.findOneBy({ id })
    if (!ressourcPedagogique) {
      throw new NotFoundException("ressourcPedagogique not found")
    }

    if (updateRessourcPedagogiqueDto.classeId !== undefined) {
      if (updateRessourcPedagogiqueDto.classeId === null) {
        ressourcPedagogique.classe = null;
      } else {
        const classe = await this.classeRepository.findOneBy({ id: updateRessourcPedagogiqueDto.classeId });
        if (!classe) {
          throw new NotFoundException('classe not found');
        }
        ressourcPedagogique.classe = classe;
      }
    }

    const updateressourcPedagogique = await this.ressourcPedagogiqueRepository.preload({ ...updateRessourcPedagogiqueDto as DeepPartial<RessourcPedagogique>, id })
    if (!updateressourcPedagogique) {
      throw new NotFoundException(`can not update a #${id} ressourcPedagogique`)

    }
    return this.ressourcPedagogiqueRepository.save(updateressourcPedagogique)
  }




  async remove(id: number) {
    const ressourcPedagogique = await this.ressourcPedagogiqueRepository.findOneBy({ id })
    if (!ressourcPedagogique) {
      throw new NotFoundException("ressourcPedagogique not found")

    }
    await this.ressourcPedagogiqueRepository.delete(id)
    return id
  }
}
