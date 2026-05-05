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
    @IsString()
    titre: string;

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

    @IsOptional()
    @IsNumber()
    classeId?: number;

    @IsNotEmpty()
    @IsString()
    proprietaire: string;

    @IsNotEmpty()
    @IsString()
    semestre: string;

    @IsOptional()
    @IsString()
    lien?: string;
}
