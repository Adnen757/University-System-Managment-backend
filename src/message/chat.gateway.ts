import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from '../message/message.service';
import { CreateMessageDto } from '../message/dto/create-message.dto';
import { NotificationService } from '../notification/notification.service';
import { NotificationType } from '../notification/entities/notification.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedUsers = new Map<number, string>(); // userId -> socketId

  constructor(
    private readonly messageService: MessageService,
    private readonly notificationService: NotificationService
  ) { }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    for (const [userId, socketId] of this.connectedUsers.entries()) {
      if (socketId === client.id) {
        this.connectedUsers.delete(userId);
        break;
      }
    }
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('identify')
  handleIdentify(@MessageBody() userId: number, @ConnectedSocket() client: Socket) {
    this.connectedUsers.set(userId, client.id);
    return { status: 'success' };
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() data: CreateMessageDto) {
    const message = await this.messageService.create(data);
    const receiverSocketId = this.connectedUsers.get(data.receiverId);

    if (receiverSocketId) {
      this.server.to(receiverSocketId).emit('newMessage', message);
    }

    // Create a notification for the receiver
    try {
      await this.notificationService.create({
        titre: `Nouveau message de ${message.sender.fullname}`,
        message: message.contenu.substring(0, 50) + (message.contenu.length > 50 ? '...' : ''),
        type: NotificationType.MESSAGE,
        user: data.receiverId,
      });
    } catch (err) {
      console.error('Error creating notification for message:', err);
    }

    return message;
  }
}
