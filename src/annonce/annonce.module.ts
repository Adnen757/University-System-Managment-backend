import { Module } from '@nestjs/common';
import { AnnonceService } from './annonce.service';
import { AnnonceController } from './annonce.controller';
import { Annonce } from './entities/annonce.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationModule } from 'src/notification/notification.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Annonce]),
    NotificationModule,
    UserModule
  ],
  controllers: [AnnonceController],
  providers: [AnnonceService],
})
export class AnnonceModule { }
