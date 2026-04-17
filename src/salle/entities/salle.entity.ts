import { Seance } from "src/seance/entities/seance.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity("salle")
export class Salle {
@PrimaryGeneratedColumn()
 id:number

 @Column()
 code:string
    @Column()   
    capacite:number
    @Column()
    batiement:string
    @Column()
    equipement:string



}
