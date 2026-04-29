import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Message } from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { ChatGateway } from './chat.gateway';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, User]),
    NotificationModule
  ],
  controllers: [MessageController],
  providers: [MessageService, ChatGateway],
  exports: [MessageService]
})
export class MessageModule { }
