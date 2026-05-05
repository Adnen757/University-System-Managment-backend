import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Classe } from 'src/classe/entities/classe.entity';
import { Inscription } from 'src/inscription/entities/inscription.entity';
import { Professeur } from 'src/professeur/entities/professeur.entity';
import { Matiere } from 'src/matiere/entities/matiere.entity';
import { Salle } from 'src/salle/entities/salle.entity';
@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Classe) private classeRepository: Repository<Classe>,
    @InjectRepository(Inscription) private inscriptionRepository: Repository<Inscription>,
    @InjectRepository(Professeur) private professeurRepository: Repository<Professeur>,
    @InjectRepository(Matiere) private matiereRepository: Repository<Matiere>,
    @InjectRepository(Salle) private salleRepository: Repository<Salle>,
  ) {}

  async getDepartmentStats(departementId: number) {
    const classes = await this.classeRepository.find({ where: { departementId } });
    const professeurs = await this.professeurRepository.find({ where: { departementId } });
    const matieres = await this.matiereRepository
      .createQueryBuilder('m')
      .innerJoin('m.departement', 'd')
      .where('d.id = :departementId', { departementId })
      .getMany();
    const salles = await this.salleRepository
      .createQueryBuilder('s')
      .innerJoin('s.departement', 'd')
      .where('d.id = :departementId', { departementId })
      .getMany();

    const studentIds = await this.inscriptionRepository
      .createQueryBuilder('i')
      .select('DISTINCT i.userId', 'userId')
      .innerJoin('i.classe', 'classe')
      .where('classe.departementId = :departementId', { departementId })
      .getRawMany();
    
    const totalStudents = studentIds.length;

    const studentsByClass = await Promise.all(
      classes.map(async (classe) => {
        const count = await this.inscriptionRepository
          .createQueryBuilder('i')
          .where('i.classeId = :classeId', { classeId: classe.id })
          .getCount();
        return {
          className: classe.nom || `Classe ${classe.id}`,
          studentCount: count,
        };
      })
    );

    return {
      totalClasses: classes.length,
      totalStudents,
      totalProfesseurs: professeurs.length,
      totalMatieres: matieres.length,
      totalSalles: salles.length,
      studentsByClass,
      professeurs: professeurs.slice(0, 4).map(p => ({
        id: p.id,
        fullname: p.fullname,
        matieres: p.matieres?.map(m => m.intitule).join(', ') || 'Non assigné',
      })),
    };
  }
}
