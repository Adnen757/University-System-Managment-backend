import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EtudiantImport } from './entities/etudiant-import.entity';
import { User } from '../user/entities/user.entity';
import { ActivityService } from '../activity/activity.service';

@Injectable()
export class EtudiantImportService {
  constructor(
    @InjectRepository(EtudiantImport)
    private readonly etudiantImportRepository: Repository<EtudiantImport>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly activityService: ActivityService,
  ) {}

  async createBulk(etudiants: { nom: string; cin: string; departementId: number }[]) {
    // Note: User accounts are NO LONGER created automatically here.
    // The etudiant-import table acts as a reference for students to self-register.

    // Keep a record in import history
    const importRecords = this.etudiantImportRepository.create(etudiants.map(e => ({ nom: e.nom, cin: e.cin, departementId: e.departementId })));
    const saved = await this.etudiantImportRepository.save(importRecords);
    
    if (etudiants.length > 1) {
      this.activityService.logAction('IMPORT', `Import massif de ${etudiants.length} étudiants`);
    } else if (etudiants.length === 1) {
      this.activityService.logAction('ADD', `Nouvel étudiant ajouté : ${etudiants[0].nom}`);
    }
    
    return saved;
  }

  findAll() {
    return this.etudiantImportRepository.find();
  }

  async verifyName(nom: string): Promise<boolean> {
    if (!nom) return false;
    // Vérifier en ignorant la casse et les espaces superflus
    const count = await this.etudiantImportRepository.createQueryBuilder('e')
      .where('LOWER(TRIM(e.nom)) = LOWER(TRIM(:nom))', { nom })
      .getCount();
    return count > 0;
  }

  async verifyInscription(nom: string, cin: string, departementId: number): Promise<boolean> {
    if (!nom || !cin || !departementId) return false;
    const count = await this.etudiantImportRepository.createQueryBuilder('e')
      .where('LOWER(TRIM(e.nom)) = LOWER(TRIM(:nom))', { nom })
      .andWhere('TRIM(e.cin) = TRIM(:cin)', { cin })
      .andWhere('e.departementId = :departementId', { departementId })
      .getCount();
    return count > 0;
  }

  async update(id: number, updateData: { nom?: string; cin?: string; departementId?: number }) {
    const record = await this.etudiantImportRepository.findOneBy({ id });
    if (!record) throw new Error('Étudiant introuvable');

    Object.assign(record, updateData);
    const updated = await this.etudiantImportRepository.save(record);
    this.activityService.logAction('UPDATE', `Mise à jour du profil de l'étudiant : ${record.nom}`);
    return updated;
  }

  async remove(id: number) {
    const record = await this.etudiantImportRepository.findOneBy({ id });
    if (!record) return null;

    const removed = await this.etudiantImportRepository.remove(record);
    this.activityService.logAction('DELETE', `Suppression de l'étudiant : ${record.nom}`);
    return removed;
  }
}
