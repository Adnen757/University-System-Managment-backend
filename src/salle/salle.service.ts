import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSalleDto } from './dto/create-salle.dto';
import { UpdateSalleDto } from './dto/update-salle.dto';
import { Salle } from './entities/salle.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Seance } from 'src/seance/entities/seance.entity';

@Injectable()
export class SalleService {
  constructor(
    @InjectRepository(Salle)
    private readonly salleRepository: Repository<Salle>,
    @InjectRepository(Seance)
    private readonly seanceRepository: Repository<Seance>
  ) {}

  async create(createSalleDto: CreateSalleDto): Promise<Salle> {
    const salle = this.salleRepository.create(createSalleDto);
    return this.salleRepository.save(salle);
  }

  async findAll(): Promise<Salle[]> {
    const salles = await this.salleRepository.find({
      relations: ["seances"],
    });

    if (!salles.length) {
      throw new NotFoundException("No salles found");
    }
    return salles;
  }

  async findOne(id: number): Promise<Salle> {
    const salle = await this.salleRepository.findOne({
      where: { id },
      relations: ["seances"],
    });

    if (!salle) {
      throw new NotFoundException("Salle not found");
    }
    return salle;
  }

  async update(id: number, dto: UpdateSalleDto): Promise<Salle> {
    const salle = await this.salleRepository.preload({
      id,
      ...dto,
    });

    if (!salle) {
      throw new NotFoundException(`Salle #${id} not found`);
    }

    return this.salleRepository.save(salle);
  }

  async remove(id: number): Promise<void> {
    const result = await this.salleRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException("Salle not found");
    }
  }
}