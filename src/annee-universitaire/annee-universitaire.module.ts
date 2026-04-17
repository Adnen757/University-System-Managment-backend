import { Module } from '@nestjs/common';
import { AnneeUniversitaireService } from './annee-universitaire.service';
import { AnneeUniversitaireController } from './annee-universitaire.controller';
import { AnneeUniversitaire } from './entities/annee-universitaire.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([AnneeUniversitaire])],
  controllers: [AnneeUniversitaireController],
  providers: [AnneeUniversitaireService],
})
export class AnneeUniversitaireModule {}
