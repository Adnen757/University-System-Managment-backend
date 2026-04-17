import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdministrateurDto } from './dto/create-administrateur.dto';
import { UpdateAdministrateurDto } from './dto/update-administrateur.dto';
import { Administrateur } from './entities/administrateur.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AdministrateurService {

constructor(
   @InjectRepository(Administrateur) private administrateurRepository:Repository<Administrateur>
  ){

  }
  
  
 async create(createAdministrateurDto: CreateAdministrateurDto):Promise<Administrateur> {
    const newAdministrateur =await this.administrateurRepository.create({...createAdministrateurDto , role:"administrateur"})
   return this.administrateurRepository.save(newAdministrateur)
  }





 async findAll(): Promise<Administrateur[]> {
     const administrateur=await this.administrateurRepository.find()
           if(administrateur.length===0){
             throw new NotFoundException("data not found")
           }
           return administrateur
  }





 async findOne(id: number): Promise<Administrateur> {
       const administrateur =await this.administrateurRepository.findOneBy({id})
if(!administrateur){
  throw new NotFoundException("administrateur not found")
}
return administrateur
  }



 async update(id: number, updateAdministrateurDto: UpdateAdministrateurDto) :Promise<Administrateur> {
     const administrateur =await this.administrateurRepository.findOneBy({id})
if(!administrateur){
  throw new NotFoundException("administrateur not found")
}
const updateAdministrateur= await this.administrateurRepository.preload({...updateAdministrateurDto,id})
if(!updateAdministrateur){
  throw new NotFoundException(`can not update a #${id} administrateur`)

}
return this.administrateurRepository.save(updateAdministrateur)
  }




 async remove(id: number) {
     const administrateur =await this.administrateurRepository.findOneBy({id})
if(!administrateur){
  throw new NotFoundException("administrateur not found")
 
}
 await this.administrateurRepository.delete(id)
 return id
  }
}
