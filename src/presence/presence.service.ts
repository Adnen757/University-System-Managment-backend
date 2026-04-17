import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePresenceDto } from './dto/create-presence.dto';
import { UpdatePresenceDto } from './dto/update-presence.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Presence } from './entities/presence.entity';
import { DeepPartial, Repository } from 'typeorm';
import { Etudiant } from 'src/etudiant/entities/etudiant.entity';

@Injectable()
export class PresenceService {


  constructor(
    @InjectRepository(Presence) private presenceRepository: Repository<Presence>,
    @InjectRepository(Etudiant) private etudiantRepository: Repository<Etudiant>
  ) {

  }



  async create(createPresenceDto: CreatePresenceDto): Promise<Presence> {

    const etudiant = await this.etudiantRepository.findOne({ where: { id: createPresenceDto.etudiant }, relations: ["presences"] })
    if (!etudiant) {
      throw new NotFoundException("etudiant not found")

    }




    const newpresence = await this.presenceRepository.create({ ...createPresenceDto, etudiant: etudiant })
    return this.presenceRepository.save(newpresence)
  }






  async findAll(): Promise<Presence[]> {
    const presence = await this.presenceRepository.find()
    if (presence.length === 0) {
      throw new NotFoundException("data not found")
    }
    return presence
  }








  async findOne(id: number): Promise<Presence> {
    const presence = await this.presenceRepository.findOneBy({ id })
    if (!presence) {
      throw new NotFoundException("presence not found")
    }
    return presence
  }






  async update(id: number, updatePresenceDto: UpdatePresenceDto): Promise<Presence> {
    const presence = await this.presenceRepository.findOneBy({ id })
    if (!presence) {
      throw new NotFoundException("presence not found")
    }
    const updatedpresence = await this.presenceRepository.preload({ ...updatePresenceDto as DeepPartial<Presence>, id })
    if (!updatedpresence) {
      throw new NotFoundException(`can not update a #${id} presence `)

    }
    return this.presenceRepository.save(updatedpresence)
  }




  async remove(id: number) {
    const presence = await this.presenceRepository.findOneBy({ id })
    if (!presence) {
      throw new NotFoundException("presence not found")

    }
    await this.presenceRepository.delete(id)
    return id
  }
}
