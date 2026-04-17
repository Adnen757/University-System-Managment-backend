import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateNoteDto {

    @IsNotEmpty()
    @IsString()
    valeur: string

    @IsNotEmpty()
    @IsString()
    commentaire: string

    @IsNotEmpty()
    @IsBoolean()
    validee: boolean


    @IsNotEmpty()
    @IsNumber()
    etudiant: number

    @IsNotEmpty()
    @IsNumber()
    evaluation: number

    @IsNotEmpty()
    @IsString()
    semestre: string

}
