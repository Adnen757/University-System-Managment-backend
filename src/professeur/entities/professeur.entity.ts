import { Seance } from "src/seance/entities/seance.entity";
import { User } from "src/user/entities/user.entity";
import { ChildEntity, JoinColumn, ManyToOne, Column, PrimaryGeneratedColumn } from "typeorm";

@ChildEntity("Professeur")
export class Professeur extends User {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    ChargeHoraireSemestrielle: string

    @ManyToOne("Departement", "professeurs", { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'departementId' })
    departement: any;

    @Column({ nullable: true })
    departementId: number;
}
