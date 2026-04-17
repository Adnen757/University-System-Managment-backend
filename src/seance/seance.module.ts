import { Module } from '@nestjs/common';
import { SeanceService } from './seance.service';
import { SeanceController } from './seance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seance } from './entities/seance.entity';
import { Salle } from 'src/salle/entities/salle.entity';
import { Professeur } from 'src/professeur/entities/professeur.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Seance,Salle,Professeur])],
  controllers: [SeanceController],
  providers: [SeanceService],
})
export class SeanceModule {}
