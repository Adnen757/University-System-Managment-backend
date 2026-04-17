import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRessourcPedagogiqueDto } from './dto/create-ressourc-pedagogique.dto';
import { UpdateRessourcPedagogiqueDto } from './dto/update-ressourc-pedagogique.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { RessourcPedagogique } from './entities/ressourc-pedagogique.entity';
import { Matiere } from 'src/matiere/entities/matiere.entity';

@Injectable()
export class RessourcPedagogiquesService {

  constructor(
    @InjectRepository(RessourcPedagogique) private ressourcPedagogiqueRepository: Repository<RessourcPedagogique>,
    @InjectRepository(Matiere) private matiereRepository: Repository<Matiere>
  ) { }



  async create(createRessourcPedagogiqueDto: CreateRessourcPedagogiqueDto): Promise<RessourcPedagogique> {
    const matiere = await this.matiereRepository.findOne({ where: { id: createRessourcPedagogiqueDto.matiereId } })
    if (!matiere) {
      throw new NotFoundException('matiere not found')
    }
    const newressource = this.ressourcPedagogiqueRepository.create({ ...createRessourcPedagogiqueDto, matiere: matiere })
    return this.ressourcPedagogiqueRepository.save(newressource)
  }





  async findAll(): Promise<RessourcPedagogique[]> {
    const ressourcPedagogique = await this.ressourcPedagogiqueRepository.find()
    if (ressourcPedagogique.length === 0) {
      throw new NotFoundException("data not found")
    }
    return ressourcPedagogique
  }





  async findOne(id: number): Promise<RessourcPedagogique> {
    const ressourcPedagogique = await this.ressourcPedagogiqueRepository.findOneBy({ id })
    if (!ressourcPedagogique) {
      throw new NotFoundException("ressourcPedagogique not found")
    }
    return ressourcPedagogique
  }





  async update(id: number, updateRessourcPedagogiqueDto: UpdateRessourcPedagogiqueDto): Promise<RessourcPedagogique> {
    const ressourcPedagogique = await this.ressourcPedagogiqueRepository.findOneBy({ id })
    if (!ressourcPedagogique) {
      throw new NotFoundException("ressourcPedagogique not found")
    }
    const updateressourcPedagogique = await this.ressourcPedagogiqueRepository.preload({ ...updateRessourcPedagogiqueDto as DeepPartial<RessourcPedagogique>, id })
    if (!updateressourcPedagogique) {
      throw new NotFoundException(`can not update a #${id} ressourcPedagogique`)

    }
    return this.ressourcPedagogiqueRepository.save(updateressourcPedagogique)
  }




  async remove(id: number) {
    const ressourcPedagogique = await this.ressourcPedagogiqueRepository.findOneBy({ id })
    if (!ressourcPedagogique) {
      throw new NotFoundException("ressourcPedagogique not found")

    }
    await this.ressourcPedagogiqueRepository.delete(id)
    return id
  }
}
