import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity("Message")
export class Message {

@PrimaryGeneratedColumn()
 id:number



 @Column()
 contenu:string 
    @Column()   
dateEnvoi:Date

@Column()
lu:boolean



}
