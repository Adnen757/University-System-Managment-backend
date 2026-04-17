import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";

@Entity("inscription")
export class Inscription {
     @PrimaryGeneratedColumn()
        id: number

     @Column()
     cin:number

     @Column()
     matricule_bac:number

     @Column()
     niveau:string

     @ManyToOne("Departement", "inscriptions", { onDelete: "CASCADE" })
    @JoinColumn({ name: "departement_id" })
    departement: any

     @ManyToOne("Classe", "inscriptions")
    @JoinColumn({ name: "classe_id" })
    classe: any

    @ManyToOne("User", "inscriptions", { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user: any

    @Column("simple-array", { nullable: true })
    photos: string[]
}
