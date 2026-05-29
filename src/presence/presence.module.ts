import { Module } from '@nestjs/common';
import { PresenceService } from './presence.service';
import { PresenceController } from './presence.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Presence } from './entities/presence.entity';
import { Etudiant } from 'src/etudiant/entities/etudiant.entity';
import { AiLog } from './entities/ai-log.entity';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
   imports:[
     TypeOrmModule.forFeature([Presence, Etudiant, AiLog]),
     NotificationModule
   ],
  controllers: [PresenceController],
  providers: [PresenceService],
})
export class PresenceModule {}
