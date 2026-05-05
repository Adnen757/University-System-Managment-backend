import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("Message")
export class Message {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  contenu: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateEnvoi: Date

  @Column({ default: false })
  lu: boolean

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  sender: User

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  receiver: User
}
