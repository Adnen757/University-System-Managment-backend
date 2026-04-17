import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Salle } from "../entities/salle.entity";

export class CreateSalleDto {
@IsNotEmpty()
@IsString()
code:string

@IsNotEmpty()
@IsNumber()
capacite:number
 
@IsNotEmpty()
@IsString()
batiement:string


@IsNotEmpty()
@IsString()
equipement:string

@IsNotEmpty()
seance:number

}
