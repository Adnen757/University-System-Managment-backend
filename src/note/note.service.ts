import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { DeepPartial, Repository } from 'typeorm';
import { Etudiant } from 'src/etudiant/entities/etudiant.entity';
import { Evaluation } from 'src/evaluation/entities/evaluation.entity';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationType } from 'src/notification/entities/notification.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note) private noteRepository: Repository<Note>,
    @InjectRepository(Etudiant) private etudiantRepository: Repository<Etudiant>,
    @InjectRepository(Evaluation) private evaluationRepository: Repository<Evaluation>,
    private notificationService: NotificationService
  ) {

  }


  async create(createNoteDto: CreateNoteDto): Promise<Note> {

    const etudiant = await this.etudiantRepository.findOne({
      where: { id: Number(createNoteDto.etudiant) },
      relations: ["notes", "departement"]
    });
    if (!etudiant) {
      throw new NotFoundException("etudiant not found")
    }

    // Enforce date limite if set on the department
    if (etudiant.departement && etudiant.departement.dateLimiteNote) {
      const currentDate = new Date();
      const limitDate = new Date(etudiant.departement.dateLimiteNote);
      limitDate.setHours(23, 59, 59, 999);
      if (currentDate > limitDate) {
        // throw new BadRequestException("La date limite de saisie des notes pour ce département est dépassée.");
      }
    }

    let evaluation = null;
    if (createNoteDto.evaluation) {
      evaluation = await this.evaluationRepository.findOne({ where: { id: Number(createNoteDto.evaluation) } });
    }

    const newNote = this.noteRepository.create({
      ...createNoteDto,
      etudiant: etudiant,
      evaluation: evaluation
    });
    const savedNote = await this.noteRepository.save(newNote);

    // Envoyer une notification à l'étudiant
    try {
      if (savedNote.etudiant && savedNote.validee) {
        await this.notificationService.create({
          titre: "Nouvelle note saisie",
          message: `Une nouvelle note (${savedNote.type || 'DS'}) a été enregistrée pour vous par ${savedNote.professeurNom || 'votre professeur'}.`,
          type: NotificationType.NOTE,
          user: savedNote.etudiant.id
        });
      }
    } catch (e) {
      console.error('Erreur lors de la notification (create note):', e);
    }

    return savedNote;
  }




  async findAll(matiereId?: string, type?: string, evaluationId?: string, semestre?: string, classeId?: string, etudiantId?: string): Promise<Note[]> {
    const where: any = {};
    if (matiereId) where.matiereId = parseInt(matiereId);
    if (type) where.type = type;
    if (evaluationId) where.evaluation = { id: parseInt(evaluationId) };
    if (semestre) where.semestre = semestre;
    if (classeId) where.classeId = parseInt(classeId);
    if (etudiantId) where.etudiant = { id: parseInt(etudiantId) };

    const note = await this.noteRepository.find({ where, relations: ['etudiant'] });
    return note;
  }





  async findOne(id: number): Promise<Note> {
    const note = await this.noteRepository.findOneBy({ id })
    if (!note) {
      throw new NotFoundException("note not found")
    }
    return note
  }






  async update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.noteRepository.findOne({
      where: { id },
      relations: ["etudiant", "etudiant.departement"]
    });
    if (!note) {
      throw new NotFoundException("note not found")
    }

    // Enforce date limite if set on the department
    if (note.etudiant && note.etudiant.departement && note.etudiant.departement.dateLimiteNote) {
      const currentDate = new Date();
      const limitDate = new Date(note.etudiant.departement.dateLimiteNote);
      limitDate.setHours(23, 59, 59, 999);
      if (currentDate > limitDate) {
        // throw new BadRequestException("La date limite de saisie des notes pour ce département est dépassée.");
      }
    }

    const updatenote = await this.noteRepository.preload({ ...updateNoteDto as DeepPartial<Note>, id })
    if (!updatenote) {
      throw new NotFoundException(`can not update a #${id} note `)

    }
    const savedUpdate = await this.noteRepository.save(updatenote);

    // Envoyer une notification à l'étudiant pour la mise à jour
    try {
      if (note.etudiant && savedUpdate.validee && savedUpdate.valeur !== note.valeur) {
        await this.notificationService.create({
          titre: "Note modifiée",
          message: `Votre note (${savedUpdate.type || 'DS'}) a été mise à jour par ${savedUpdate.professeurNom || 'votre professeur'}.`,
          type: NotificationType.NOTE,
          user: note.etudiant.id
        });
      }
    } catch (e) {
      console.error('Erreur lors de la notification (update note):', e);
    }

    return savedUpdate;
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
