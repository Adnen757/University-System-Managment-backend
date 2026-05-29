import { Evaluation } from "src/evaluation/entities/evaluation.entity";
import { Matiere } from "src/matiere/entities/matiere.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("Note")
export class Note {

    @PrimaryGeneratedColumn()
    id: number


    @Column()
    valeur: string
    @Column()
    commentaire: string
    @Column()
    validee: boolean

    @ManyToOne("Etudiant", "notes", { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'etudiantId' })
    etudiant: any

    @Column({ nullable: true })
    etudiantId: number

    @ManyToOne(() => Evaluation, (evaluation) => evaluation.notes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'evaluationId' })
    evaluation: Evaluation

    @Column({ nullable: true })
    evaluationId: number

    @ManyToOne(() => Matiere, { eager: true })
    @JoinColumn({ name: 'matiereId' })
    matiere: Matiere;

    @Column({ nullable: true })
    matiereId: number;

    @Column({ nullable: true })
    type: string

    @Column()
    semestre: string

    @Column({ nullable: true })
    professeurNom: string;

    @Column({ nullable: true })
    dateSaisie: string;

    @Column({ nullable: true })
    classeId: number;
}




