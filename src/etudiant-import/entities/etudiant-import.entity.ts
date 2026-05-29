import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('etudiant_import')
export class EtudiantImport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  cin: string;

  @Column({ nullable: true })
  departementId: number;

  @CreateDateColumn()
  dateImportation: Date;
}
