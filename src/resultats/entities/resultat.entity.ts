import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Classe } from '../../classe/entities/classe.entity';
import { Departement } from '../../departement/entities/departement.entity';

@Entity('Resultat')
export class Resultat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  etudiantId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'etudiantId' })
  etudiant: User;

  @Column({ nullable: true })
  classeId: number;

  @ManyToOne(() => Classe, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'classeId' })
  classe: Classe;

  @Column({ nullable: true })
  departementId: number;

  @ManyToOne(() => Departement, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'departementId' })
  departement: Departement;

  @Column()
  annee: number;

  @Column()
  semestre: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  moyenneSemestre1: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  moyenneSemestre2: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  moyenneGenerale: number;

  @Column({ nullable: true })
  rang: number;

  @Column()
  statut: string;

  @Column()
  mention: string;

  @Column('json', { nullable: true })
  detailsNotes: any;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateCalcul: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
