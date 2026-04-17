import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { DeepPartial, Repository } from 'typeorm';
import { Etudiant } from 'src/etudiant/entities/etudiant.entity';
import { Evaluation } from 'src/evaluation/entities/evaluation.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note) private noteRepository: Repository<Note>,
    @InjectRepository(Etudiant) private etudiantRepository: Repository<Etudiant>,
    @InjectRepository(Evaluation) private evaluationRepository: Repository<Evaluation>
  ) {

  }


  async create(createNoteDto: CreateNoteDto): Promise<Note> {

    const etudiant = await this.etudiantRepository.findOne({ where: { id: Number(createNoteDto.etudiant) }, relations: ["notes"] })
    if (!etudiant) {
      throw new NotFoundException("etudiant not found")

    }



    const evaluation = await this.evaluationRepository.findOne({ where: { id: Number(createNoteDto.evaluation) } })
    if (!evaluation) {
      throw new NotFoundException("evaluation not found")
    }

    const newNote = await this.noteRepository.create({ ...createNoteDto, etudiant: etudiant, evaluation: evaluation })
    return this.noteRepository.save(newNote)
  }




  async findAll(): Promise<Note[]> {
    const note = await this.noteRepository.find()
    if (note.length === 0) {
      throw new NotFoundException("data not found")
    }
    return note
  }





  async findOne(id: number): Promise<Note> {
    const note = await this.noteRepository.findOneBy({ id })
    if (!note) {
      throw new NotFoundException("note not found")
    }
    return note
  }






  async update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.noteRepository.findOneBy({ id })
    if (!note) {
      throw new NotFoundException("note not found")
    }
    const updatenote = await this.noteRepository.preload({ ...updateNoteDto as DeepPartial<Note>, id })
    if (!updatenote) {
      throw new NotFoundException(`can not update a #${id} note `)

    }
    return this.noteRepository.save(updatenote)
  }





  async remove(id: number) {
    const note = await this.noteRepository.findOneBy({ id })
    if (!note) {
      throw new NotFoundException("note not found")

    }
    await this.noteRepository.delete(id)
    return id
  }
}
