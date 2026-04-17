import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum justificatifType{
    EN_ATTENTE ="EN_ATTENTE",
    ACCEPTE="ACCEPTE",
    REFUSE="REFUSE",
   
}
@Entity("JustificatifAbsence")
export class JustificatifAbsence {

@PrimaryGeneratedColumn()
 id:number
 @Column()
 fichier:string
    @Column({type:"enum", enum:justificatifType})
    statut:justificatifType
    @Column()
    dateSoumission:Date
    @Column()
    dateDecision:Date


}
