
import { Column, Entity, JoinColumn, ManyToOne,  PrimaryGeneratedColumn } from "typeorm";


@Entity("Specialite")
export class Specialite {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    code: string

    @Column()
    nom: string

    @Column()
    description: string

    @ManyToOne("Departement", "specialites", { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'departementId' })
    departement: any

    @Column({ nullable: true })
    departementId: number




}
