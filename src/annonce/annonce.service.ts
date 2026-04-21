import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnnonceDto } from './dto/create-annonce.dto';
import { UpdateAnnonceDto } from './dto/update-annonce.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Annonce } from './entities/annonce.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class AnnonceService {
constructor(
   @InjectRepository(Annonce) private annonceRepository:Repository<Annonce>

  ){

  }




 async create(createAnnonceDto: CreateAnnonceDto):Promise<Annonce> {
      const newannonce = this.annonceRepository.create(createAnnonceDto);
      return this.annonceRepository.save(newannonce);
  }




  


async  findAll():Promise<Annonce[]> {
      const annonce = await this.annonceRepository.find();
      return annonce;
  }






 async findOne(id: number):Promise<Annonce> {
      const annonce = await this.annonceRepository.findOne({ where: { id } });
      if (!annonce) {
        throw new NotFoundException("annonce not found");
      }
      return annonce;
  }








 async update(id: number, updateAnnonceDto: UpdateAnnonceDto ):Promise<Annonce> {
   const annonce = await this.annonceRepository.findOneBy({ id });
   if (!annonce) {
     throw new NotFoundException("annonce not found");
   }

   const updateannonce = await this.annonceRepository.preload({
     ...updateAnnonceDto as DeepPartial<Annonce>,
     id
   });

   if (!updateannonce) {
     throw new NotFoundException(`can not update a #${id} annonce`);
   }

   return this.annonceRepository.save(updateannonce);
  }






 async remove(id: number) {
    const annonce =await this.annonceRepository.findOneBy({id})
if(!annonce){
  throw new NotFoundException("annonce not found")
 
}
 await this.annonceRepository.delete(id)
 return id
  }  
  }

