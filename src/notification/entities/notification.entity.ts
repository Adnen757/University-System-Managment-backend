import { User } from "src/user/entities/user.entity";
import { Column, PrimaryGeneratedColumn, Entity, OneToMany, JoinColumn, ManyToOne } from "typeorm";

export enum NotificationType {
  NOTE = "NOTE",
  ABSENCE = "ABSENCE",
  PLANING = "PLANING",
  ANNONCE = "ANNONCE",
  MESSAGE = "MESSAGE",
}

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titre: string;

  @Column()
  message: string;

  @Column({
    type: "enum",
    enum: NotificationType,
  })
  type: NotificationType;

  @Column({ default: false })
  lu: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' })
  user: User;
}