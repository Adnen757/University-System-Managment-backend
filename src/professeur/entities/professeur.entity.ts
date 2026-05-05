import { Seance } from "src/seance/entities/seance.entity";
import { User } from "src/user/entities/user.entity";
import { ChildEntity, JoinColumn, ManyToOne, ManyToMany, JoinTable, Column, PrimaryGeneratedColumn } from "typeorm";
import { Matiere } from "src/matiere/entities/matiere.entity";

@ChildEntity("Professeur")
export class Professeur extends User {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    ChargeHoraireSemestrielle: string

    @Column({ nullable: true })
    matiere: string

    @ManyToMany(() => Matiere)
    @JoinTable()
    matieres: Matiere[];

    @ManyToOne("Departement", "professeurs", { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'departementId' })
    departement: any;

    @Column({ nullable: true })
    departementId: number;
}
