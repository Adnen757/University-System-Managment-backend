import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClasseDto } from './dto/create-classe.dto';
import { UpdateClasseDto } from './dto/update-classe.dto';
import { Classe } from './entities/classe.entity';
import { Departement } from 'src/departement/entities/departement.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClasseService {

  constructor(
   @InjectRepository(Classe) private classeRepository:Repository<Classe>,
   @InjectRepository(Departement) private departementRepository:Repository<Departement>
  ){

  }





 async create(createClasseDto: CreateClasseDto):Promise<Classe> {
    const { departementId, ...rest } = createClasseDto;
    const classe = this.classeRepository.create(rest);
    
    if (departementId) {
      const departement = await this.departementRepository.findOneBy({ id: departementId });
      if (!departement) {
        throw new NotFoundException(`Departement avec id ${departementId} non trouvé`);
      }
      classe.departement = departement;
    }
    
    return this.classeRepository.save(classe);
  }





 async findAll(departementId?: number):Promise<Classe[]> {
    // TODO: Réactiver le filtrage après synchronisation de la base de données
    // const where = departementId ? { departementId } : {};
    const classes = await this.classeRepository.find({ relations: ['departement'] });
    return classes;
  }





 async findOne(id: number):Promise<Classe> {
    const classe = await this.classeRepository.findOne({
      where: { id },
      relations: ['departement']
    });
    if (!classe) {
      throw new NotFoundException("classe not found");
    }
    return classe;
  }




 async update(id: number, updateClasseDto: UpdateClasseDto):Promise<Classe> {
    const classe = await this.classeRepository.findOne({
      where: { id },
      relations: ['departement']
    });
    if (!classe) {
      throw new NotFoundException("classe not found");
    }
    
    const { departementId, ...rest } = updateClasseDto;
    
    if (departementId !== undefined) {
      if (departementId === null) {
        classe.departement = null;
      } else {
        const departement = await this.departementRepository.findOneBy({ id: departementId });
        if (!departement) {
          throw new NotFoundException(`Departement avec id ${departementId} non trouvé`);
        }
        classe.departement = departement;
      }
    }
    
    Object.assign(classe, rest);
    return this.classeRepository.save(classe);
  }





 async remove(id: number) {
     const classe =await this.classeRepository.findOne({
      where: { id },
      relations: ['inscriptions']
    });
if(!classe){
  throw new NotFoundException("classe not found")
}
// Supprimer d'abord les inscriptions associées si elles existent
if (classe.inscriptions && classe.inscriptions.length > 0) {
  await this.classeRepository.createQueryBuilder()
    .relation(Classe, 'inscriptions')
    .of(classe)
    .remove(classe.inscriptions);
}
 await this.classeRepository.delete(id)
 return id
  }
}
