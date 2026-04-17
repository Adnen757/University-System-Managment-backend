import { Module } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { EvaluationController } from './evaluation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evaluation } from './entities/evaluation.entity';
import { Matiere } from 'src/matiere/entities/matiere.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Evaluation, Matiere])],
  controllers: [EvaluationController],
  providers: [EvaluationService],
})
export class EvaluationModule { }
