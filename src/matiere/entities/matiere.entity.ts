import { Evaluation } from "src/evaluation/entities/evaluation.entity";
import { RessourcPedagogique } from "src/ressourc-pedagogiques/entities/ressourc-pedagogique.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Departement } from "src/departement/entities/departement.entity";
import { User } from "src/user/entities/user.entity";
import { Classe } from "src/classe/entities/classe.entity";

@Entity("Matiere")
export class Matiere {
     @PrimaryGeneratedColumn()
     id: number

     @Column()
     code: string

     @Column()
     intitule: string

     @Column()
     coefficient: number

     @Column()
     creditsECTS: number

     @ManyToOne(() => Departement, (departement) => departement.matieres, { onDelete: 'CASCADE' })
     departement: Departement

     @ManyToMany(() => User, (professeur) => professeur.matieres)
     @JoinTable()
     professeurs: User[]

     @ManyToMany(() => Classe, (classe) => classe.matieres)
     @JoinTable()
     classes: Classe[]

     @OneToMany(() => Evaluation, (evaluation) => evaluation.matiere, { cascade: true })
     evaluations: Evaluation[]

     @OneToMany(() => RessourcPedagogique, (ressource) => ressource.matiere, { cascade: true })
     ressources: RessourcPedagogique[]
}
