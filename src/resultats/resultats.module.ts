import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resultat } from './entities/resultat.entity';
import { ResultatService } from './resultats.service';
import { ResultatController } from './resultats.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Resultat])],
  controllers: [ResultatController],
  providers: [ResultatService],
})
export class ResultatsModule {}
