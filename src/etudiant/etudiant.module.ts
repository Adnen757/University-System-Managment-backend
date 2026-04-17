import { Module } from '@nestjs/common';
import { EtudiantService } from './etudiant.service';
import { EtudiantController } from './etudiant.controller';
import { Etudiant } from './entities/etudiant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Presence } from 'src/presence/entities/presence.entity';

import { Departement } from 'src/departement/entities/departement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Etudiant, Presence, Departement])],

  controllers: [EtudiantController],
  providers: [EtudiantService],
})
export class EtudiantModule { }
