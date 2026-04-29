import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Professeur } from "src/professeur/entities/professeur.entity";
import { Matiere } from "src/matiere/entities/matiere.entity";
import { Salle } from "src/salle/entities/salle.entity";

export enum JourSemaine {
  LUNDI = 'Lundi',
  MARDI = 'Mardi',
  MERCREDI = 'Mercredi',
  JEUDI = 'Jeudi',
  VENDREDI = 'Vendredi',
  SAMEDI = 'Samedi',
}

export enum TypeSeance {
  COURS = 'COURS',
  TD = 'TD',
  TP = 'TP',
  EXAMEN = 'EXAMEN',
  RATTRAPAGE = 'RATTRAPAGE',
}

@Entity("emploi_du_temps")
export class EmploiDuTemps {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: JourSemaine })
  jour: JourSemaine;

  @Column()
  seanceIndex: number;

  @Column({ nullable: true })
  heureDebut: string;

  @Column({ nullable: true })
  heureFin: string;

  @Column({ nullable: true })
  professeurId: number;

  @ManyToOne(() => Professeur, (prof) => prof.id, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'professeurId' })
  professeur: Professeur;

  @Column({ nullable: true })
  matiereId: number;

  @ManyToOne(() => Matiere, (mat) => mat.id, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'matiereId' })
  matiere: Matiere;

  @Column({ nullable: true })
  salleId: number;

  @ManyToOne(() => Salle, (salle) => salle.id, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'salleId' })
  salle: Salle;

  @Column({ type: 'enum', enum: TypeSeance, default: TypeSeance.COURS })
  type: TypeSeance;

  @Column({ nullable: true })
  departementId: number;

  @Column({ nullable: true })
  classeId: number;

  @Column({ nullable: true })
  classNom: string;
}
