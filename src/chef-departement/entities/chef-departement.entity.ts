import { User } from "src/user/entities/user.entity";
import { ChildEntity, JoinColumn, OneToOne, Column } from "typeorm";

@ChildEntity("ChefDepartement")
export class ChefDepartement extends User {

    @OneToOne("Departement", "chefDepartement", { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'departementId' })
    departement: any;

    @Column({ nullable: true })
    departementId: number;
}