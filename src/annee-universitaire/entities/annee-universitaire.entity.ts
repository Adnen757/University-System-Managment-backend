import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity("annee_universitaire")
export class AnneeUniversitaire {

@PrimaryGeneratedColumn()
 id:number

@Column()
code:string

@Column()
dateDebut:Date

@Column()
dateFin:Date
@Column()
estEnCours:boolean


}
