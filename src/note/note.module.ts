import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Etudiant } from 'src/etudiant/entities/etudiant.entity';
import { Evaluation } from 'src/evaluation/entities/evaluation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note, Etudiant, Evaluation])],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule { }
