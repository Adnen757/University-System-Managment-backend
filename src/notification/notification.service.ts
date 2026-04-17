import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { DeepPartial, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)

     private readonly notificationRepository:Repository<Notification>,
     @InjectRepository(User) private readonly userRepository:Repository<User>
  ){

  }


  async create(createNotificationDto: CreateNotificationDto):Promise<Notification> {
    const user = await this.userRepository.findOne({where:{id:createNotificationDto.user}, relations:["notifications"]})
    if(!user){
      throw new NotFoundException("user not found")
    }
       const newnotification = await this.notificationRepository.create({...createNotificationDto,user})
    return this.notificationRepository.save(newnotification)
    }



  async findAll():Promise<Notification[]> {
       const notification=await this.notificationRepository.find()
          if(notification.length===0){
            throw new NotFoundException("data not found")
          }
          return notification
  
        }



  async findOne(id: number):Promise<Notification> {
       const notification =await this.notificationRepository.findOneBy({id})
    if(!notification){
      throw new NotFoundException("notification not found")
    }
    return notification
      }



  async update(id: number, UpdateNotificationDto: UpdateNotificationDto):Promise<Notification> {
    const notification =await this.notificationRepository.findOneBy({id})
   if(!notification){
     throw new NotFoundException("notification not found")
   }
   const updatenotification= await this.notificationRepository.preload({...UpdateNotificationDto as DeepPartial<Notification>,id})
   if(!updatenotification){
     throw new NotFoundException(`can not update a #${id} notification`)
   
   }
   return this.notificationRepository.save(updatenotification)  }




   async remove(id: number) {
const notification =await this.notificationRepository.findOneBy({id})
if(!notification){
  throw new NotFoundException("notification not found")
 
}
 await this.notificationRepository.delete(id)
 return id
  }  
}
