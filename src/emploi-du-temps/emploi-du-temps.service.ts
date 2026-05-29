import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmploiDuTemps } from './entities/emploi-du-temps.entity';
import { CreateEmploiDuTempsDto } from './dto/create-emploi-du-temps.dto';
import { UpdateEmploiDuTempsDto } from './dto/update-emploi-du-temps.dto';

@Injectable()
export class EmploiDuTempsService {
  constructor(
    @InjectRepository(EmploiDuTemps)
    private readonly emploiDuTempsRepository: Repository<EmploiDuTemps>,
  ) {}

  private async checkConflict(jour: string, seanceIndex: number, professeurId?: number, salleId?: number, excludeId?: number, currentClasseId?: number) {
    if (!professeurId && !salleId) return;

    const query = this.emploiDuTempsRepository.createQueryBuilder('e')
      .where('e.jour = :jour AND e.seanceIndex = :seanceIndex', { jour, seanceIndex });
      
    if (excludeId) {
      query.andWhere('e.id != :excludeId', { excludeId });
    }
    
    const existingEntries = await query.getMany();
    
    // Filter out entries that belong to the SAME class (shouldn't happen with the new create logic, but just in case)
    const relevantEntries = currentClasseId ? existingEntries.filter(e => Number(e.classeId) !== Number(currentClasseId)) : existingEntries;
    
    const profConflict = professeurId ? relevantEntries.some(e => Number(e.professeurId) === Number(professeurId)) : false;
    const salleConflict = salleId ? relevantEntries.some(e => Number(e.salleId) === Number(salleId)) : false;
    
    if (profConflict && salleConflict) {
       throw new BadRequestException('Conflit détecté : cette salle et cet enseignant sont déjà utilisés dans une autre classe durant cette séance.');
    } else if (profConflict) {
       throw new BadRequestException('Conflit détecté : cet enseignant est déjà affecté à une autre classe durant cette séance.');
    } else if (salleConflict) {
       throw new BadRequestException('Conflit détecté : cette salle est déjà occupée par une autre classe durant cette séance.');
    }
  }

  async create(createDto: CreateEmploiDuTempsDto): Promise<EmploiDuTemps> {
    // 1. Find if an entry already exists for this exact class/jour/seance to avoid duplicates
    let existingEntry = null;
    if (createDto.classeId) {
       existingEntry = await this.emploiDuTempsRepository.findOne({
          where: { jour: createDto.jour as any, seanceIndex: createDto.seanceIndex, classeId: createDto.classeId }
       });
    } else if (createDto.professeurId) {
       // Enseignant mode fallback
       existingEntry = await this.emploiDuTempsRepository.findOne({
          where: { jour: createDto.jour as any, seanceIndex: createDto.seanceIndex, professeurId: createDto.professeurId }
       });
    }

    // 2. Check conflicts (excluding the existing entry if we found one)
    await this.checkConflict(createDto.jour, createDto.seanceIndex, createDto.professeurId, createDto.salleId, existingEntry?.id, createDto.classeId);

    // 3. If an entry exists, we update it
    if (existingEntry) {
       Object.assign(existingEntry, createDto);
       return this.emploiDuTempsRepository.save(existingEntry);
    }

    // 4. Otherwise create new
    const entry = this.emploiDuTempsRepository.create(createDto);
    return this.emploiDuTempsRepository.save(entry);
  }

  async findAll(departementId?: number, classeId?: number, professeurId?: number): Promise<EmploiDuTemps[]> {
    const query = this.emploiDuTempsRepository.createQueryBuilder('e')
      .leftJoinAndSelect('e.professeur', 'prof')
      .leftJoinAndSelect('e.matiere', 'mat')
      .leftJoinAndSelect('e.salle', 'salle')
      .leftJoinAndSelect('e.classe', 'classe');
    if (departementId && classeId) {
      query.where('e.departementId = :departementId AND e.classeId = :classeId', { departementId, classeId });
    } else if (departementId) {
      query.where('e.departementId = :departementId', { departementId });
    } else if (classeId) {
      query.where('e.classeId = :classeId', { classeId });
    }
    if (professeurId) {
      query.andWhere('e.professeurId = :professeurId', { professeurId });
    }
    return query.getMany();
  }

  async findOne(id: number): Promise<EmploiDuTemps> {
    const entry = await this.emploiDuTempsRepository.findOne({
      where: { id },
      relations: ['professeur', 'matiere', 'salle', 'classe'],
    });
    if (!entry) {
      throw new NotFoundException('Emploi du temps non trouvé');
    }
    return entry;
  }

  async update(id: number, updateDto: UpdateEmploiDuTempsDto): Promise<EmploiDuTemps> {
    const existing = await this.findOne(id);
    const jour = updateDto.jour || existing.jour;
    const seanceIndex = updateDto.seanceIndex || existing.seanceIndex;
    const professeurId = updateDto.professeurId !== undefined ? updateDto.professeurId : existing.professeurId;
    const salleId = updateDto.salleId !== undefined ? updateDto.salleId : existing.salleId;

    await this.checkConflict(jour, seanceIndex, professeurId, salleId, id);

    const entry = await this.emploiDuTempsRepository.preload({ id, ...updateDto });
    if (!entry) {
      throw new NotFoundException('Emploi du temps non trouvé');
    }
    return this.emploiDuTempsRepository.save(entry);
  }

  async remove(id: number): Promise<number> {
    const entry = await this.findOne(id);
    await this.emploiDuTempsRepository.delete(id);
    return id;
  }
}
