import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpecialiteDto } from './dto/create-specialite.dto';
import { UpdateSpecialiteDto } from './dto/update-specialite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Specialite } from './entities/specialite.entity';
import { DeepPartial, Repository } from 'typeorm';
import { Departement } from 'src/departement/entities/departement.entity';

@Injectable()
export class SpecialiteService {
  constructor(
    @InjectRepository(Specialite) private specialiteRepository: Repository<Specialite>,
    @InjectRepository(Departement) private departementRepository: Repository<Departement>
  ) { }


  async create(createSpecialiteDto: CreateSpecialiteDto): Promise<Specialite> {
    const departement = await this.departementRepository.findOne({ where: { id: createSpecialiteDto.departementId } })
    if (!departement) {
      throw new NotFoundException('departement not found')
    }
    const newspecialite = this.specialiteRepository.create({ ...createSpecialiteDto, departement: departement })
    return this.specialiteRepository.save(newspecialite)
  }



  async findAll(): Promise<Specialite[]> {
    const specialite = await this.specialiteRepository.find()
    if (specialite.length === 0) {
      throw new NotFoundException("data not found")
    }
    return specialite

  }

  async findOne(id: number): Promise<Specialite> {
    const specialite = await this.specialiteRepository.findOneBy({ id })
    if (!specialite) {
      throw new NotFoundException("specialite not found")
    }
    return specialite
  }



  async update(id: number, UpdateSpecialiteDto: UpdateSpecialiteDto): Promise<Specialite> {
    const specialite = await this.specialiteRepository.findOneBy({ id })
    if (!specialite) {
      throw new NotFoundException("specialite not found")
    }
    const updatespecialite = await this.specialiteRepository.preload({ ...UpdateSpecialiteDto as DeepPartial<Specialite>, id })
    if (!updatespecialite) {
      throw new NotFoundException(`can not update a #${id} specialite`)

    }
    return this.specialiteRepository.save(updatespecialite)
  }





  async remove(id: number) {
    const specialite = await this.specialiteRepository.findOneBy({ id })
    if (!specialite) {
      throw new NotFoundException("specialite not found")

    }
    await this.specialiteRepository.delete(id)
    return id
  }
}
