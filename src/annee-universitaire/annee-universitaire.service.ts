import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnneeUniversitaireDto } from './dto/create-annee-universitaire.dto';
import { UpdateAnneeUniversitaireDto } from './dto/update-annee-universitaire.dto';
import { AnneeUniversitaire } from './entities/annee-universitaire.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AnneeUniversitaireService {

constructor(
   @InjectRepository(AnneeUniversitaire) private anneeUniversitaireRepository:Repository<AnneeUniversitaire>
  ){

  }



async  create(createAnneeUniversitaireDto: CreateAnneeUniversitaireDto):Promise<AnneeUniversitaire> {
   const newAnneeUniversitaire =await this.anneeUniversitaireRepository.create(createAnneeUniversitaireDto)
   return this.anneeUniversitaireRepository.save(newAnneeUniversitaire)
  }








 async findAll(): Promise<AnneeUniversitaire[]> {
    const anneeUniversitaire=await this.anneeUniversitaireRepository.find()
                     if(anneeUniversitaire.length===0){
                       throw new NotFoundException("data not found")
                     }
                     return anneeUniversitaire
  }






 async findOne(id: number): Promise<AnneeUniversitaire>  {
          const anneeUniversitaire =await this.anneeUniversitaireRepository.findOneBy({id})
if(!anneeUniversitaire){
  throw new NotFoundException("annee Universitaire not found")
}
return anneeUniversitaire
  }








 async update(id: number, updateAnneeUniversitaireDto: UpdateAnneeUniversitaireDto) :Promise<AnneeUniversitaire> {
     const anneeUniversitaire =await this.anneeUniversitaireRepository.findOneBy({id})
if(!anneeUniversitaire){
  throw new NotFoundException("annee Universitaire not found")
}
const updateanneeUniversitaire= await this.anneeUniversitaireRepository.preload({...updateAnneeUniversitaireDto,id})
if(!updateanneeUniversitaire){
  throw new NotFoundException(`can not update a #${id} annee Universitaire `)

}
return this.anneeUniversitaireRepository.save(updateanneeUniversitaire)
  }






 async remove(id: number) {
          const anneeUniversitaire =await this.anneeUniversitaireRepository.findOneBy({id})
if(!anneeUniversitaire){
  throw new NotFoundException("annee Universitaire not found")
 
}
 await this.anneeUniversitaireRepository.delete(id)
 return id
  }
  }

