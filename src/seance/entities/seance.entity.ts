import { join } from "path";
import { Professeur } from "src/professeur/entities/professeur.entity";
import { Salle } from "src/salle/entities/salle.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum SeanceType{
    TD="TD",
    TP="TP",
    COURS="COURS",
    EXAMEN="EXAMEN",    
    RATTRAPAGE="RATTRAPAGE",
}

@Entity("Seance")
export class Seance {

@PrimaryGeneratedColumn()
 id:number
 @Column({
    type:"enum",
    enum:SeanceType
 })
 type:SeanceType

 @Column()
    date:Date
 @Column()
 heureDebut:string
 @Column()   
    heureFin:string
 @Column()
 groupe:string
 



}
