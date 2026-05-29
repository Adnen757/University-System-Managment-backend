import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resultat } from './entities/resultat.entity';

@Injectable()
export class ResultatService {
  constructor(
    @InjectRepository(Resultat)
    private resultatRepository: Repository<Resultat>,
  ) {}

  async saveBulk(resultats: any[]) {
    // We could delete previous results for the same semester/year before saving new ones
    // But for now let's just save them as an history (dateCalcul makes them unique)
    const created = this.resultatRepository.create(resultats);
    return await this.resultatRepository.save(created);
  }

  async findAll(departementId?: number) {
    const query = this.resultatRepository.createQueryBuilder('resultat')
      .leftJoinAndSelect('resultat.etudiant', 'etudiant')
      .leftJoinAndSelect('resultat.classe', 'classe')
      .leftJoinAndSelect('resultat.departement', 'departement')
      .orderBy('resultat.dateCalcul', 'DESC')
      .addOrderBy('resultat.rang', 'ASC');

    if (departementId) {
      query.andWhere('resultat.departementId = :departementId', { departementId });
    }

    return await query.getMany();
  }
}
