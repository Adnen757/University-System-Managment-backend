import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnnonceDto } from './dto/create-annonce.dto';
import { UpdateAnnonceDto } from './dto/update-annonce.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Annonce } from './entities/annonce.entity';
import { DeepPartial, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AnnonceService {
constructor(
   @InjectRepository(Annonce) private annonceRepository:Repository<Annonce>,
      @InjectRepository(User) private userRepository:Repository<User>

  ){

  }




 async create(createAnnonceDto: CreateAnnonceDto):Promise<Annonce> {


const user = await this.userRepository.findOne({where:{id:createAnnonceDto.user}, relations:["annonce"]})
    if(!user){
      throw new NotFoundException("user not found")

    }

      const newannonce =await this.annonceRepository.create({...createAnnonceDto })
   return this.annonceRepository.save(newannonce)
  }




  


async  findAll():Promise<Annonce[]> {
      const annonce=await this.annonceRepository.find()
          if(annonce.length===0){
            throw new NotFoundException("data not found")
          }
          return annonce
  }






 async findOne(id: number):Promise<Annonce> {
      const annonce =await this.annonceRepository.findOneBy({id})
if(!annonce){
  throw new NotFoundException("annonce not found")
}
return annonce
  }








 async update(id: number, updateAnnonceDto: UpdateAnnonceDto ):Promise<Annonce> {


   const annonce =await this.annonceRepository.findOneBy({id})
if(!annonce){
  throw new NotFoundException("annonce not found")
}
const updateannonce= await this.annonceRepository.preload({...updateAnnonceDto as DeepPartial<Annonce>,id})
if(!updateannonce){
  throw new NotFoundException(`can not update a #${id} annonce`)

}
return this.annonceRepository.save(updateannonce)
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

