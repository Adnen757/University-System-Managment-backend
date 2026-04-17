import { Module } from '@nestjs/common';
import { SalleService } from './salle.service';
import { SalleController } from './salle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Salle } from './entities/salle.entity';
import { Seance } from 'src/seance/entities/seance.entity';

@Module({
   imports:[TypeOrmModule.forFeature([Salle,Seance])],
  controllers: [SalleController],
  providers: [SalleService],
})
export class SalleModule {}
