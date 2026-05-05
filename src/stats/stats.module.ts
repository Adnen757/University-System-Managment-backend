import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { Classe } from 'src/classe/entities/classe.entity';
import { Inscription } from 'src/inscription/entities/inscription.entity';
import { Professeur } from 'src/professeur/entities/professeur.entity';
import { Matiere } from 'src/matiere/entities/matiere.entity';
import { Salle } from 'src/salle/entities/salle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Classe, Inscription, Professeur, Matiere, Salle])],
  controllers: [StatsController],
  providers: [StatsService],
  exports: [StatsService],
})
export class StatsModule {}
