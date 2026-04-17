import { User } from "src/user/entities/user.entity";
import { ChildEntity } from "typeorm";

@ChildEntity("Administrateur")
export class Administrateur extends User {}
