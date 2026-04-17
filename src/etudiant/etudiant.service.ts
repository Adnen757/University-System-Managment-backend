import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEtudiantDto } from './dto/create-etudiant.dto';
import { UpdateEtudiantDto } from './dto/update-etudiant.dto';
import { Etudiant } from './entities/etudiant.entity';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Departement } from 'src/departement/entities/departement.entity';
import { promises } from 'fs';

@Injectable()
export class EtudiantService {
  constructor(
    @InjectRepository(Etudiant) private etudiantRepository: Repository<Etudiant>,
    @InjectRepository(Departement) private departementRepository: Repository<Departement>
  ) { }


  async create(createEtudiantDto: CreateEtudiantDto): Promise<Etudiant> {
    const departement = await this.departementRepository.findOne({ where: { id: createEtudiantDto.departementId } })
    if (!departement) {
      throw new NotFoundException('departement not found')
    }
    const { departementId, ...userData } = createEtudiantDto;
    const newetudiant = await this.etudiantRepository.create({ 
      ...userData, 
      departementId, 
      role: "etudiant" 
    })
    return this.etudiantRepository.save(newetudiant)
  }






  async findAll(): Promise<Etudiant[]> {
    const etudiant = await this.etudiantRepository.find()
    if (etudiant.length === 0) {
      throw new NotFoundException("data not found")
    }
    return etudiant

  }




  async findOne(id: number): Promise<Etudiant> {
    const etudiant = await this.etudiantRepository.findOneBy({ id })
    if (!etudiant) {
      throw new NotFoundException("etudiant not found")
    }
    return etudiant
  }







  async update(id: number, updateEtudiantDto: UpdateEtudiantDto): Promise<Etudiant> {
    const etudiant = await this.etudiantRepository.findOneBy({ id })
    if (!etudiant) {
      throw new NotFoundException("etudiant not found")
    }
    const updateetudant = await this.etudiantRepository.preload({ ...updateEtudiantDto as DeepPartial<Etudiant>, id })
    if (!updateetudant) {
      throw new NotFoundException(`can not update a #${id} etudiant`)

    }
    return this.etudiantRepository.save(updateetudant)
  }





  async remove(id: number) {
    const etudiant = await this.etudiantRepository.findOneBy({ id })
    if (!etudiant) {
      throw new NotFoundException("etudiant not found")

    }
    await this.etudiantRepository.delete(id)
    return id
  }
}
