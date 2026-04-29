import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { Administrateur } from '../administrateur/entities/administrateur.entity';
import { Departement } from '../departement/entities/departement.entity';
import { Classe } from '../classe/entities/classe.entity';
import { Etudiant } from '../etudiant/entities/etudiant.entity';
import { Inscription } from '../inscription/entities/inscription.entity';
import { Professeur } from '../professeur/entities/professeur.entity';
import { Matiere } from '../matiere/entities/matiere.entity';
import { Evaluation } from '../evaluation/entities/evaluation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Administrateur, Departement, Classe, Etudiant, Inscription, Professeur, Matiere, Evaluation])],
  providers: [SeedService],
})
export class DatabaseModule {}
