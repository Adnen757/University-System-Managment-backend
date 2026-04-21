import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MessageService {

constructor(
   @InjectRepository(Message) private messageRepository:Repository<Message>,
     @InjectRepository(User) private userRepository:Repository<User>

  ){

  }


 async create(createMessageDto: CreateMessageDto):Promise<Message> {

const user = await this.userRepository.findOne({where:{id:createMessageDto.user}, relations:["message"]})
    if(!user){
      throw new NotFoundException("user not found")

    }



      const newmessage =await this.messageRepository.create({...createMessageDto ,})
   return this.messageRepository.save(newmessage)
  }





 async findAll():Promise<Message[]> {
     const messages=await this.messageRepository.find()
                     if(messages.length===0){
                       throw new NotFoundException("data not found")
                     }
                     return messages
  }




 async findOne(id: number):Promise<Message> {
          const message =await this.messageRepository.findOneBy({id})
if(!message){
  throw new NotFoundException("message not found")
}
return message
  }




async  update(id: number, updateMessageDto: UpdateMessageDto ):Promise<Message> {
     const message =await this.messageRepository.findOneBy({id})
if(!message){
  throw new NotFoundException("message not found")
}
const updatedmessage= await this.messageRepository.preload({...updateMessageDto as DeepPartial<Message>,id})
if(!updatedmessage){
  throw new NotFoundException(`can not update a #${id} message `)

}
return this.messageRepository.save(updatedmessage)
  }





 async remove(id: number) {
             const message =await this.messageRepository.findOneBy({id})
if(!message){
  throw new NotFoundException("message not found")
 
}
 await this.messageRepository.delete(id)
 return id
  }
  }

