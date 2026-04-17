import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateAnneeUniversitaireDto {


@IsNotEmpty()
@IsString()
code:string

@Type(() => Date)
@IsNotEmpty()
@IsDate()
dateDebut:Date

@Type(() => Date)
@IsNotEmpty()
@IsDate()
dateFin:Date


@IsBoolean()
estEnCours:boolean


}
