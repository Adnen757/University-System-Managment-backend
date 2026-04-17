import { Module } from '@nestjs/common';
import { ProfesseurService } from './professeur.service';
import { ProfesseurController } from './professeur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professeur } from './entities/professeur.entity';
import { Seance } from 'src/seance/entities/seance.entity';

import { Departement } from 'src/departement/entities/departement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Professeur, Seance, Departement])],
  controllers: [ProfesseurController],
  providers: [ProfesseurService],
})
export class ProfesseurModule { }
