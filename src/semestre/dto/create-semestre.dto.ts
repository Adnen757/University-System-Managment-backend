import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSemestreDto {


@IsNotEmpty()
@IsString()
code:string

@IsNotEmpty()
@IsNumber()
numero:number

@Type(() => Date)
@IsNotEmpty()
@IsDate()
deteDebut:Date


@Type(() => Date)
@IsNotEmpty()
@IsDate()
dateFin:Date



}
