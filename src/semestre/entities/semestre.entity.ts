import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Semestre")
export class Semestre {

@PrimaryGeneratedColumn()
 id:number

@Column()
code:string
@Column()
numero:number
@Column()
deteDebut:Date
@Column()
dateFin:Date

}
