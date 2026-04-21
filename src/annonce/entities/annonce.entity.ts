import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
export enum annonceType{
        ETUDIANT="ETUDIANT",
    CHEF_DEPARTEMENT="CHEF_DEPARTEMENT",
    ENSEIGNANT="ENSEIGNANT",
        
    
}
@Entity("annonce")
export class Annonce {
@PrimaryGeneratedColumn()
 id:number

@Column()
 title:string
@Column()
 contenu:string 
@Column()
 datePublication:string
@Column({type:"enum", enum:annonceType})
 cibleRole:annonceType
@Column()
cibleDepartement:string

@Column({ nullable: true })
departementId: number



}
