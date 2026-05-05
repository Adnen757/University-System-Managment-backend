import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createDto: CreateEmploiDuTempsDto): Promise<EmploiDuTemps> {
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
