import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSemestreDto } from './dto/create-semestre.dto';
import { UpdateSemestreDto } from './dto/update-semestre.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Semestre } from './entities/semestre.entity';

@Injectable()
export class SemestreService {

constructor(
   @InjectRepository(Semestre) private semestreRepository:Repository<Semestre>
  ){

  }



 async create(createSemestreDto: CreateSemestreDto):Promise<Semestre> {
    const newSemestre =await this.semestreRepository.create(createSemestreDto)
   return this.semestreRepository.save(newSemestre)
  }






 async findAll():Promise<Semestre[]> {
   const semestre=await this.semestreRepository.find()
                if(semestre.length===0){
                  throw new NotFoundException("data not found")
                }
                return semestre
  }






 async findOne(id: number):Promise<Semestre> {
     const semestre =await this.semestreRepository.findOneBy({id})
if(!semestre){
  throw new NotFoundException("salle not found")
}
return semestre
  }







async  update(id: number, updateSemestreDto: UpdateSemestreDto):Promise<Semestre> {
       const semestre =await this.semestreRepository.findOneBy({id})
if(!semestre){
  throw new NotFoundException("semestre not found")
}
const updatesemestre= await this.semestreRepository.preload({...updateSemestreDto,id})
if(!updatesemestre){
  throw new NotFoundException(`can not update a #${id} semestre `)

}
return this.semestreRepository.save(updatesemestre)
  }





async  remove(id: number) {
           const semestre =await this.semestreRepository.findOneBy({id})
if(!semestre){
  throw new NotFoundException("semestre not found")
 
}
 await this.semestreRepository.delete(id)
 return id
  } 
  }

