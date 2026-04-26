import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn, TableInheritance, OneToMany, ManyToMany, JoinTable } from "typeorm";
import * as argon2 from 'argon2'
import { Inscription } from "../../inscription/entities/inscription.entity";
import { ChefDepartement } from "src/chef-departement/entities/chef-departement.entity";
import { Matiere } from "src/matiere/entities/matiere.entity";
@Entity("user")
@TableInheritance({column:{type:"varchar", name:"role"}})


export class User extends BaseEntity {
@PrimaryGeneratedColumn()
id:number




@Column({type:"varchar",nullable:true})
refreshToken:string |  null





@Column()
fullname:string
@Column({unique:true   })
email:string
@Column()
password:string



@Column()
role:string

@Column({ nullable: true })
departementId: number

@OneToMany(() => Inscription, (inscription) => inscription.user)
inscriptions: Inscription[]

@ManyToMany(() => Matiere, (matiere) => matiere.professeurs)
matieres: Matiere[]




@BeforeInsert()
@BeforeUpdate()
async hashPassword(){
    if(this.password&& !this.password.startsWith("$argon2")){
            this.password=await argon2.hash(this.password);
        }
    }

    
}
