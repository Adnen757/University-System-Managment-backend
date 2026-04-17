import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJustificatifAbsenceDto } from './dto/create-justificatif-absence.dto';
import { UpdateJustificatifAbsenceDto } from './dto/update-justificatif-absence.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JustificatifAbsence } from './entities/justificatif-absence.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JustificatifAbsenceService {
constructor(
   @InjectRepository(JustificatifAbsence) private justificatifAbsenceRepository:Repository<JustificatifAbsence>
  ){

  }


async  create(createJustificatifAbsenceDto: CreateJustificatifAbsenceDto):Promise<JustificatifAbsence> {
    const newjustificatif =await this.justificatifAbsenceRepository.create(createJustificatifAbsenceDto)
   return this.justificatifAbsenceRepository.save(newjustificatif)
  }





async  findAll():Promise<JustificatifAbsence[]> {
     const justificatif=await this.justificatifAbsenceRepository.find()
                      if(justificatif.length===0){
                        throw new NotFoundException("data not found")
                      }
                      return justificatif
  }




  
 async findOne(id: number):Promise<JustificatifAbsence> {
      const justificatif =await this.justificatifAbsenceRepository.findOneBy({id})
if(!justificatif){
  throw new NotFoundException("justificatif not found")
}
return justificatif
  }




async  update(id: number, updateJustificatifAbsenceDto: UpdateJustificatifAbsenceDto) :Promise<JustificatifAbsence> {
   const justificatif =await this.justificatifAbsenceRepository.findOneBy({id})
if(!justificatif){
  throw new NotFoundException("justificatif not found")
}
const updatedjustificatif= await this.justificatifAbsenceRepository.preload({...updateJustificatifAbsenceDto,id})
if(!updatedjustificatif){
  throw new NotFoundException(`can not update a #${id} justificatif absence`)

}
return this.justificatifAbsenceRepository.save(updatedjustificatif)
  }





 async remove(id: number) {
            const justificatif =await this.justificatifAbsenceRepository.findOneBy({id})
if(!justificatif){
  throw new NotFoundException("justificatif not found")
 
}
 await this.justificatifAbsenceRepository.delete(id)
 return id
  }
  }

