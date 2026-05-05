import { Matiere } from "src/matiere/entities/matiere.entity";
import { Classe } from "src/classe/entities/classe.entity";
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

    @Column()
    titre: string;

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

    @ManyToOne(() => Classe, (classe) => classe.ressources, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'classeId' })
    classe: Classe

    @Column({ nullable: true })
    classeId: number

    @Column()
    proprietaire: string;

    @Column()
    semestre: string;

    @Column({ nullable: true })
    lien: string;
}
