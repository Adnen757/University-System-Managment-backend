import { IsBoolean, IsNotEmpty, IsNumber, IsString, IsOptional } from "class-validator";

export class CreateNoteDto {

    @IsNotEmpty()
    @IsString()
    valeur: string

    @IsOptional()
    @IsString()
    commentaire: string

    @IsNotEmpty()
    @IsBoolean()
    validee: boolean


    @IsNotEmpty()
    @IsNumber()
    etudiant: number

    @IsOptional()
    @IsNumber()
    evaluation: number

    @IsOptional()
    @IsNumber()
    matiereId: number

    @IsOptional()
    @IsString()
    type: string

    @IsNotEmpty()
    @IsString()
    semestre: string

    @IsOptional()
    @IsString()
    professeurNom: string;

    @IsOptional()
    @IsString()
    dateSaisie: string;

    @IsOptional()
    @IsNumber()
    classeId: number;
}
