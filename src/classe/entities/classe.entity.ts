import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

@Entity("classe")
export class Classe {
  @PrimaryGeneratedColumn()
    id: number

    @Column()
    nom: string

    @Column()
    niveau: string

    @Column({ nullable: true })
    departementId: number

    @ManyToOne("Departement", "classes", { onDelete: "CASCADE" })
    @JoinColumn({ name: "departement_id" })
    departement: any

    @OneToMany("Inscription", "classe")
    inscriptions: any[]
}
