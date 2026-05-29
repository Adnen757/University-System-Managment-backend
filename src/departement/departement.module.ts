import { Module } from '@nestjs/common';
import { DepartementService } from './departement.service';
import { DepartementController } from './departement.controller';
import { Departement } from './entities/departement.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professeur } from '../professeur/entities/professeur.entity';
import { NotificationModule } from '../notification/notification.module';

@Module({
   imports:[
     TypeOrmModule.forFeature([Departement, Professeur]),
     NotificationModule
   ],
  controllers: [DepartementController],
  providers: [DepartementService],
  exports: [TypeOrmModule],
})
export class DepartementModule {}
