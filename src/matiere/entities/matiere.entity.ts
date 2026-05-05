import { Evaluation } from "src/evaluation/entities/evaluation.entity";
import { RessourcPedagogique } from "src/ressourc-pedagogiques/entities/ressourc-pedagogique.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Departement } from "src/departement/entities/departement.entity";
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

     @ManyToMany(() => Classe, (classe) => classe.matieres)
     classes: Classe[]

     @OneToMany(() => Evaluation, (evaluation) => evaluation.matiere, { cascade: true })
     evaluations: Evaluation[]

     @OneToMany(() => RessourcPedagogique, (ressource) => ressource.matiere, { cascade: true })
     ressources: RessourcPedagogique[]
}
