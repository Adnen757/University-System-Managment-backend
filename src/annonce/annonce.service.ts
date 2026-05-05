import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnnonceDto } from './dto/create-annonce.dto';
import { UpdateAnnonceDto } from './dto/update-annonce.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Annonce } from './entities/annonce.entity';
import { DeepPartial, Repository } from 'typeorm';
import { NotificationService } from 'src/notification/notification.service';
import { UserService } from 'src/user/user.service';
import { NotificationType } from 'src/notification/entities/notification.entity';

@Injectable()
export class AnnonceService {
  constructor(
    @InjectRepository(Annonce) private annonceRepository: Repository<Annonce>,
    private readonly notificationService: NotificationService,
    private readonly userService: UserService
  ) { }

  async create(createAnnonceDto: CreateAnnonceDto): Promise<Annonce> {
    const newannonce = this.annonceRepository.create(createAnnonceDto);
    const savedAnnonce = await this.annonceRepository.save(newannonce);

    // Get all users with role 'Etudiant' or 'Etudiant'
    try {
      const users = await this.userService.findAll();
      const students = users.filter(u => u.role === 'Etudiant' || u.role === 'ETUDIANT');

      await Promise.all(students.map(student =>
         this.notificationService.create({
           titre: `Nouvelle Annonce: ${savedAnnonce.title}`,
           message: savedAnnonce.contenu.substring(0, 100) + (savedAnnonce.contenu.length > 100 ? '...' : ''),
           type: NotificationType.ANNONCE,
           user: student.id
         })
       ));
    } catch (err) {
      console.error('Error creating notifications for new announcement:', err);
    }

    return savedAnnonce;
  }




  


async  findAll():Promise<Annonce[]> {
      const annonce = await this.annonceRepository.find();
      return annonce;
  }






 async findOne(id: number):Promise<Annonce> {
      const annonce = await this.annonceRepository.findOne({ where: { id } });
      if (!annonce) {
        throw new NotFoundException("annonce not found");
      }
      return annonce;
  }








 async update(id: number, updateAnnonceDto: UpdateAnnonceDto ):Promise<Annonce> {
   const annonce = await this.annonceRepository.findOneBy({ id });
   if (!annonce) {
     throw new NotFoundException("annonce not found");
   }

   const updateannonce = await this.annonceRepository.preload({
     ...updateAnnonceDto as DeepPartial<Annonce>,
     id
   });

   if (!updateannonce) {
     throw new NotFoundException(`can not update a #${id} annonce`);
   }

   return this.annonceRepository.save(updateannonce);
  }






 async remove(id: number) {
    const annonce =await this.annonceRepository.findOneBy({id})
if(!annonce){
  throw new NotFoundException("annonce not found")
 
}
 await this.annonceRepository.delete(id)
 return id
  }  
  }

