import { Seance } from "src/seance/entities/seance.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Departement } from "src/departement/entities/departement.entity";

@Entity("salle")
export class Salle {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nom: string

  @Column()
  capacite: number

  @ManyToOne(() => Departement, (departement) => departement.salles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "departement_id" })
  departement: Departement
}
