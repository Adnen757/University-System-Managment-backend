import { IsNotEmpty, IsNumber, IsString } from "class-validator";
export enum presenceType {
    PRESENT = "PRESENT",
    ABSENT = "ABSENT",
    RETARD = "RETARD",
    JUSTIFIE = "JUSTIFIE",

}
export enum methodeType {
    MANUEL = "MANUEL",
    EMPREINTE = "EMPREINTE",
    FACIAL = "FACIAL",


}
export class CreatePresenceDto {


    @IsNotEmpty()
    statut: presenceType;

    @IsNotEmpty()
    @IsString()
    heureArrivee: string;

    @IsNotEmpty()
    methode: methodeType;


    @IsNumber()
    @IsNotEmpty()
    etudiant: number

    @IsNotEmpty()
    @IsString()
    seance: string

    @IsNotEmpty()
    @IsString()
    utilisateur: string

    @IsNotEmpty()
    @IsString()
    semestre: string
}
