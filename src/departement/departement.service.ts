import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartementDto } from './dto/create-departement.dto';
import { UpdateDepartementDto } from './dto/update-departement.dto';
import { Departement } from './entities/departement.entity';
import { promises } from 'dns';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class DepartementService {

  constructor(
   @InjectRepository(Departement) private departementRepository:Repository<Departement>
  ){

  }



  async create(createDepartementDto: CreateDepartementDto):Promise<Departement> {
     const newdepartement =await this.departementRepository.create(createDepartementDto)
   return this.departementRepository.save(newdepartement)
  }






 async findAll():Promise<Departement[]> {
    const departement=await this.departementRepository.find()
    if(departement.length===0){
      throw new NotFoundException("data not found")
    }
    return departement



  }







  async findOne(id: number):Promise<Departement> {
   const departement =await this.departementRepository.findOneBy({id})
if(!departement){
  throw new NotFoundException("departement not found")
}
return departement
  }






 async update(id: number, updateDepartementDto: UpdateDepartementDto):Promise<Departement> {
 const departement =await this.departementRepository.findOneBy({id})
if(!departement){
  throw new NotFoundException("departement not found")
}
const updatedepartement= await this.departementRepository.preload({...updateDepartementDto,id})
if(!updatedepartement){
  throw new NotFoundException(`can not update a #${id} departement`)

}
return this.departementRepository.save(updatedepartement)  }





 async remove(id: number) {
     const departement =await this.departementRepository.findOneBy({id})
if(!departement){
  throw new NotFoundException("departement not found")
 
}
 await this.departementRepository.delete(id)
 return id
  }
}
