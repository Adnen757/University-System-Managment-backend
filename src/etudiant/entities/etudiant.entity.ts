import { Note } from "src/note/entities/note.entity"
import { Presence } from "src/presence/entities/presence.entity"
import { Specialite } from "src/specialite/entities/specialite.entity"
import { User } from "src/user/entities/user.entity"
import { ChildEntity, Column, OneToMany, OneToOne, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm"
@ChildEntity("Etudiant")

export class Etudiant extends User {
    @PrimaryGeneratedColumn()
    id: number





    @OneToMany(() => Presence, (presence) => presence.etudiant, { cascade: true })
    presences: Presence[]

    @OneToMany(() => Note, (note) => note.etudiant, { cascade: true })
    notes: Note[]

    @ManyToOne("Departement", "etudiants", { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'departementId' })
    departement: any;

    @Column({ nullable: true })
    departementId: number;
}
