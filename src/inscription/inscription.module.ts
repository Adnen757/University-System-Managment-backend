import { Module } from '@nestjs/common';
import { InscriptionService } from './inscription.service';
import { InscriptionController } from './inscription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inscription } from './entities/inscription.entity';
import { Departement } from 'src/departement/entities/departement.entity';
import { Classe } from 'src/classe/entities/classe.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Inscription, Departement, Classe, User])],
  controllers: [InscriptionController],
  providers: [InscriptionService],
})
export class InscriptionModule {}
