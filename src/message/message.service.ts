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
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) { }

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const sender = await this.userRepository.findOneBy({ id: createMessageDto.senderId });
    const receiver = await this.userRepository.findOneBy({ id: createMessageDto.receiverId });

    if (!sender || !receiver) {
      throw new NotFoundException("Sender or receiver not found");
    }

    const newMessage = this.messageRepository.create({
      contenu: createMessageDto.contenu,
      sender,
      receiver,
      dateEnvoi: createMessageDto.dateEnvoi || new Date(),
      lu: createMessageDto.lu || false
    });

    return this.messageRepository.save(newMessage);
  }

  async findConversation(userId1: number, userId2: number): Promise<Message[]> {
    return this.messageRepository.find({
      where: [
        { sender: { id: userId1 }, receiver: { id: userId2 } },
        { sender: { id: userId2 }, receiver: { id: userId1 } }
      ],
      order: { dateEnvoi: 'ASC' },
      relations: ['sender', 'receiver']
    });
  }

  async findAll(): Promise<Message[]> {
    return this.messageRepository.find({ relations: ['sender', 'receiver'] });
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

