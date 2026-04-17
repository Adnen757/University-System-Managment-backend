import { IsDate, IsNotEmpty } from "class-validator";

export enum justificatifType{
    EN_ATTENTE ="EN_ATTENTE",
    ACCEPTE="ACCEPTE",
    REFUSE="REFUSE",
   
}
export class CreateJustificatifAbsenceDto {



@IsNotEmpty()

fichier:string

@IsNotEmpty()

statut:justificatifType
@IsNotEmpty()
@IsDate()
dateSoumission:Date

@IsNotEmpty()
@IsDate()
dateDecision:Date


}
