import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartementDto } from './dto/create-departement.dto';
import { UpdateDepartementDto } from './dto/update-departement.dto';
import { Departement } from './entities/departement.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Professeur } from '../professeur/entities/professeur.entity';
import { NotificationService } from '../notification/notification.service';
import { NotificationType } from '../notification/entities/notification.entity';


@Injectable()
export class DepartementService {

  constructor(
    @InjectRepository(Departement) private departementRepository:Repository<Departement>,
    @InjectRepository(Professeur) private professeurRepository:Repository<Professeur>,
    private readonly notificationService: NotificationService
  ){

  }



  async create(createDepartementDto: CreateDepartementDto):Promise<Departement> {
     const newdepartement =await this.departementRepository.create(createDepartementDto)
   return this.departementRepository.save(newdepartement)
  }






  async findAll():Promise<Departement[]> {
    const departement = await this.departementRepository.find({
      relations: ['professeurs', 'etudiants', 'classes']
    });
    if (departement.length === 0) {
      return [];
    }
    return departement;
  }

  async findOne(id: number):Promise<Departement> {
    const departement = await this.departementRepository.findOne({
      where: { id },
      relations: ['professeurs', 'etudiants', 'classes']
    });
    if (!departement) {
      throw new NotFoundException("departement not found");
    }
    return departement;
  }






 async update(id: number, updateDepartementDto: UpdateDepartementDto):Promise<Departement> {
   const departement =await this.departementRepository.findOneBy({id})
   if(!departement){
     throw new NotFoundException("departement not found")
   }
   const updatedepartement= await this.departementRepository.preload({...updateDepartementDto,id})
   if(!updatedepartement){
     throw new NotFoundException(`can not update a #${id} departement`)
   }
   
   const savedDept = await this.departementRepository.save(updatedepartement);

   // Notifications si une date limite est définie
   if (updateDepartementDto.dateLimiteNote) {
     try {
       const deadlineDate = new Date(updateDepartementDto.dateLimiteNote);
       const formattedDate = deadlineDate.toLocaleDateString('fr-FR', {
         day: 'numeric',
         month: 'long',
         year: 'numeric',
         hour: '2-digit',
         minute: '2-digit',
       });

       const professors = await this.professeurRepository.find({
         where: { departementId: id }
       });

       for (const prof of professors) {
         await this.notificationService.create({
           user: prof.id,
           titre: "Date limite de saisie des notes",
           message: `La date limite pour la saisie des notes du département ${savedDept.nom} a été fixée au ${formattedDate}.`,
           type: NotificationType.NOTE,
         });
       }
     } catch (err) {
       console.error('Error sending deadline notifications:', err);
     }
   }

   return savedDept;
 }





 async remove(id: number) {
     const departement =await this.departementRepository.findOneBy({id})
if(!departement){
  throw new NotFoundException("departement not found")
 
}
 await this.departementRepository.delete(id)
 return id
  }
}
