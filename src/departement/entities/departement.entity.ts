import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("Departement")
export class Departement {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    code: string

    @Column()
    nom: string

    @Column()
    description: string

    @OneToMany("Specialite", "departement", { cascade: true })
    specialites: any[]

    @OneToOne("ChefDepartement", "departement", { cascade: true })
    chefDepartement: any;
    @OneToMany("Professeur", "departement", { cascade: true })
    professeurs: any[]

    @OneToMany("Etudiant", "departement", { cascade: true })
    etudiants: any[]

    @OneToMany("Inscription", "departement", { cascade: true })
    inscriptions: any[]

    @OneToMany("Classe", "departement", { cascade: true })
    classes: any[]

    @OneToMany("Matiere", "departement", { cascade: true })
    matieres: any[]
}
