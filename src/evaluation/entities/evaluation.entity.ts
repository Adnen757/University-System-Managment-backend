import { Note } from "src/note/entities/note.entity";
import { Matiere } from "src/matiere/entities/matiere.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum EvaluationType {
    CC = "CC",
    DS = "DS",
    EXAMEN = "EXAMEN",
    PROJECT = "PROJECT",
    RATTRAPAGE = "RATTRAPAGE",
}
@Entity()
export class Evaluation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "enum", enum: EvaluationType })
    type: EvaluationType;

    @Column()
    date: Date;

    @Column()
    coefficient: number;

    @ManyToOne(() => Matiere, (matiere) => matiere.evaluations, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'matiereId' })
    matiere: Matiere

    @Column({ nullable: true })
    matiereId: number

    @Column()
    semestre: string;

    @OneToMany(() => Note, (note) => note.evaluation, { cascade: true })
    notes: Note[]

}

