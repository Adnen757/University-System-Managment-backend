import { Etudiant } from "src/etudiant/entities/etudiant.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
export enum presenceType {
     PRESENT = "PRESENT",
     ABSENT = "ABSENT",
     RETARD = "RETARD",
     JUSTIFIE = "JUSTIFIE",

}
export enum methodeType {
     MANUEL = "MANUEL",
     EMPREINTE = "EMPREINTE",
     FACIAL = "FACIAL",


}
@Entity("Presence")
export class Presence {


     @PrimaryGeneratedColumn()
     id: number

     @Column({ type: "enum", enum: presenceType })
     statut: presenceType;

     @Column({ type: "enum", enum: methodeType })
     methode: methodeType;

     @Column()
     heureArrivee: string;

     @Column()
     seance: string;

     @Column()
     utilisateur: string;

     @Column()
     semestre: string;

     @ManyToOne(() => Etudiant, (etudiant) => etudiant.presences, { onDelete: 'CASCADE' })
     @JoinColumn({ name: 'etudiantId' })
     etudiant: Etudiant;



}
