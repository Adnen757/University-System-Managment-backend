import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfesseurDto } from './dto/create-professeur.dto';
import { UpdateProfesseurDto } from './dto/update-professeur.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Professeur } from './entities/professeur.entity';
import { DeepPartial, Repository } from 'typeorm';
import { Departement } from 'src/departement/entities/departement.entity';
import { Matiere } from 'src/matiere/entities/matiere.entity';

@Injectable()
export class ProfesseurService {
  constructor(
    @InjectRepository(Professeur) private professeurRepository: Repository<Professeur>,
    @InjectRepository(Departement) private departementRepository: Repository<Departement>,
    @InjectRepository(Matiere) private matiereRepository: Repository<Matiere>
  ) { }

  async create(createProfesseurDto: CreateProfesseurDto): Promise<Professeur> {
    const departement = await this.departementRepository.findOne({ where: { id: createProfesseurDto.departementId } })
    if (!departement) {
      throw new NotFoundException('departement not found')
    }
    const { departementId, matiereIds, ...userData } = createProfesseurDto;
    const newprofesseur = await this.professeurRepository.create({ 
      ...userData, 
      departementId, 
      role: "professeur" 
    })
    const savedProfesseur = await this.professeurRepository.save(newprofesseur)
    
    // Gérer les matières associées
    if (matiereIds && Array.isArray(matiereIds) && matiereIds.length > 0) {
      const matieres = await this.matiereRepository.findByIds(matiereIds);
      savedProfesseur.matieres = matieres;
      await this.professeurRepository.save(savedProfesseur);
    }
    
    return savedProfesseur
  }



  async findAll(): Promise<Professeur[]> {
    const professeur = await this.professeurRepository.find({ relations: ['matieres'] })
    if (professeur.length === 0) {
      throw new NotFoundException("data not found")
    }
    return professeur
  }





  async findOne(id: number): Promise<Professeur> {
    const professeur = await this.professeurRepository.findOne({ where: { id }, relations: ['matieres'] })
    if (!professeur) {
      throw new NotFoundException("professeur not found")
    }
    return professeur
  }






  async update(id: number, updateProfesseurDto: UpdateProfesseurDto): Promise<Professeur> {
    const professeur = await this.professeurRepository.findOne({ where: { id }, relations: ['matieres'] })
    if (!professeur) {
      throw new NotFoundException("professeur not found")
    }
    const { matiereIds, ...updateData } = updateProfesseurDto;
    const updateprofesseur = await this.professeurRepository.preload({ ...updateData as DeepPartial<Professeur>, id })
    if (!updateprofesseur) {
      throw new NotFoundException(`can not update a #${id} professeur`)
    }
    
    // Gérer les matières associées
    if (matiereIds && Array.isArray(matiereIds)) {
      const matieres = await this.matiereRepository.findByIds(matiereIds);
      updateprofesseur.matieres = matieres;
    }
    
    return this.professeurRepository.save(updateprofesseur)
  }





  async remove(id: number) {
    const professeur = await this.professeurRepository.findOneBy({ id })
    if (!professeur) {
      throw new NotFoundException("professeur not found")

    }
    await this.professeurRepository.delete(id)
    return id
  }
}
