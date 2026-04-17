import { IsBoolean, IsNotEmpty, isNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export enum Type {
    PDF = "PDF",
    PPT = "PPT",
    VIDEO = "VIDEO",
    LIEN = "LIEN",
    AUTRE = "AUTRE",
}

export class CreateRessourcPedagogiqueDto {

    @IsNotEmpty()
    type: Type;

    





    @IsNotEmpty()
    @IsNumber()
    version: number;

    @IsNotEmpty()
    @IsBoolean()
    visible: boolean;

    @IsNotEmpty()
    @IsNumber()
    matiereId: number;

    @IsNotEmpty()
    @IsString()
    proprietaire: string;

    @IsNotEmpty()
    @IsString()
    semestre: string;



}
