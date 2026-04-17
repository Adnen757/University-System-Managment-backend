import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChefDepartementDto } from './dto/create-chef-departement.dto';
import { UpdateChefDepartementDto } from './dto/update-chef-departement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChefDepartement } from './entities/chef-departement.entity';
import { DeepPartial, Repository } from 'typeorm';
import { Departement } from 'src/departement/entities/departement.entity';

@Injectable()
export class ChefDepartementService {

  constructor(
    @InjectRepository(ChefDepartement) private chefDepartementRepository: Repository<ChefDepartement>,
    @InjectRepository(Departement) private departementRepository: Repository<Departement>
  ) { }


  async create(createChefDepartementDto: CreateChefDepartementDto): Promise<ChefDepartement> {
    const departement = await this.departementRepository.findOne({ where: { id: createChefDepartementDto.departementId } })
    if (!departement) {
      throw new NotFoundException('departement not found')
    }
    const { departementId, ...userData } = createChefDepartementDto;
    const newChefDepartement = this.chefDepartementRepository.create({ 
      ...userData, 
      departementId, 
      role: "chefDepartement" 
    })
    return this.chefDepartementRepository.save(newChefDepartement)
  }







  async findAll(): Promise<ChefDepartement[]> {
    const chefDepartement = await this.chefDepartementRepository.find()
    if (chefDepartement.length === 0) {
      throw new NotFoundException("data not found")
    }
    return chefDepartement
  }





  async findOne(id: number): Promise<ChefDepartement> {
    const chefDepartement = await this.chefDepartementRepository.findOneBy({ id })
    if (!chefDepartement) {
      throw new NotFoundException("chefDepartement not found")
    }
    return chefDepartement
  }






  async update(id: number, updateChefDepartementDto: UpdateChefDepartementDto): Promise<ChefDepartement> {
    const chefDepartement = await this.chefDepartementRepository.findOneBy({ id })
    if (!chefDepartement) {
      throw new NotFoundException("chefDepartement not found")
    }
    const updateChefDepartement = await this.chefDepartementRepository.preload({ ...updateChefDepartementDto as DeepPartial<ChefDepartement>, id })
    if (!updateChefDepartement) {
      throw new NotFoundException(`can not update a #${id} chefDepartement`)

    }
    return this.chefDepartementRepository.save(updateChefDepartement)
  }




  async remove(id: number) {
    const chefDepartement = await this.chefDepartementRepository.findOneBy({ id })
    if (!chefDepartement) {
      throw new NotFoundException("chefDepartement not found")

    }
    await this.chefDepartementRepository.delete(id)
    return id
  }
}

