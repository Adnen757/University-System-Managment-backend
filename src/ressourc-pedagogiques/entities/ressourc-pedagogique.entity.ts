import { Matiere } from "src/matiere/entities/matiere.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
export enum Type {
    PDF = "PDF",
    PPT = "PPT",
    VIDEO = "VIDEO",
    LIEN = "LIEN",
    AUTRE = "AUTRE",
}
@Entity("ressourc_pedagogique")
export class RessourcPedagogique {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "enum", enum: Type })
    type: Type;

    @Column()
    version: number;

    @Column()
    visible: boolean;

    @ManyToOne(() => Matiere, (matiere) => matiere.ressources, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'matiereId' })
    matiere: Matiere

    @Column({ nullable: true })
    matiereId: number

    @Column()
    proprietaire: string;

    @Column()
    semestre: string;


}
