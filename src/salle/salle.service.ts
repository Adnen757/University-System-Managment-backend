import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSalleDto } from './dto/create-salle.dto';
import { UpdateSalleDto } from './dto/update-salle.dto';
import { Salle } from './entities/salle.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Seance } from 'src/seance/entities/seance.entity';
import { Departement } from 'src/departement/entities/departement.entity';

@Injectable()
export class SalleService {
  constructor(
    @InjectRepository(Salle)
    private readonly salleRepository: Repository<Salle>,
    @InjectRepository(Seance)
    private readonly seanceRepository: Repository<Seance>,
    @InjectRepository(Departement)
    private readonly departementRepository: Repository<Departement>
  ) {}

  async create(createSalleDto: CreateSalleDto): Promise<Salle> {
    const { departementId, ...rest } = createSalleDto;
    const salle = this.salleRepository.create(rest);

    if (departementId) {
      const departement = await this.departementRepository.findOneBy({ id: departementId });
      if (!departement) {
        throw new NotFoundException(`Departement avec id ${departementId} non trouvé`);
      }
      salle.departement = departement;
    }

    return this.salleRepository.save(salle);
  }

  async findAll(departementId?: number): Promise<Salle[]> {
    const deptId = departementId ? Number(departementId) : undefined;
    const where = deptId ? { departement: { id: deptId } } : {};
    const salles = await this.salleRepository.find({
      where,
      relations: ["departement"],
    });
    return salles;
  }

  async findOne(id: number): Promise<Salle> {
    const salle = await this.salleRepository.findOne({
      where: { id },
      relations: ["departement"],
    });

    if (!salle) {
      throw new NotFoundException("Salle not found");
    }
    return salle;
  }

  async update(id: number, dto: UpdateSalleDto): Promise<Salle> {
    const { departementId, departement, seances, ...rest } = dto as any;
    const salle = await this.salleRepository.preload({
      id,
      ...rest,
    });

    if (!salle) {
      throw new NotFoundException(`Salle #${id} not found`);
    }

    if (departementId) {
      const departement = await this.departementRepository.findOneBy({ id: departementId });
      if (!departement) {
        throw new NotFoundException(`Departement avec id ${departementId} non trouvé`);
      }
      salle.departement = departement;
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