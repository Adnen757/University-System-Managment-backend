import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMatiereDto } from './dto/create-matiere.dto';
import { UpdateMatiereDto } from './dto/update-matiere.dto';
import { Matiere } from './entities/matiere.entity';
import { Departement } from 'src/departement/entities/departement.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MatiereService {

constructor(
   @InjectRepository(Matiere) private matiereRepository:Repository<Matiere>,
   @InjectRepository(Departement) private departementRepository:Repository<Departement>
  ){

  }



  async create(createMatiereDto: CreateMatiereDto):Promise<Matiere> {
     const { departementId, ...rest } = createMatiereDto;
     const matiere = this.matiereRepository.create(rest);
     
     if (departementId) {
       const departement = await this.departementRepository.findOneBy({ id: departementId });
       if (!departement) {
         throw new NotFoundException(`Departement avec id ${departementId} non trouvé`);
       }
       matiere.departement = departement;
     }
     
     return this.matiereRepository.save(matiere);
  }




async  findAll(departementId?: number):Promise<Matiere[]> {
   const deptId = departementId ? Number(departementId) : undefined;
   const where = deptId ? { departement: { id: deptId } } : {};
   const matieres=await this.matiereRepository.find({ where, relations: ['departement'] })
   return matieres
  }



 async findOne(id: number):Promise<Matiere> {
        const matiere =await this.matiereRepository.findOneBy({id})
if(!matiere){
  throw new NotFoundException("matiere not found")
}
return matiere
  }





 async update(id: number, updateMatiereDto: UpdateMatiereDto):Promise<Matiere> {
     const matiere =await this.matiereRepository.findOneBy({id})
if(!matiere){
  throw new NotFoundException("matiere not found")
}
const updatedMatiere= await this.matiereRepository.preload({...updateMatiereDto,id})
if(!updatedMatiere){
  throw new NotFoundException(`can not update a #${id} matiere `)

}
return this.matiereRepository.save(updatedMatiere)
  }

 async remove(id: number) {
       const matiere =await this.matiereRepository.findOneBy({id})
if(!matiere){
  throw new NotFoundException("matiere not found")
 
}
 await this.matiereRepository.delete(id)
 return id
  }
  }
