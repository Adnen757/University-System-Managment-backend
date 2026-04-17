import { IsDate, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { EvaluationType } from "../entities/evaluation.entity";
import { Type } from "class-transformer";

export class CreateEvaluationDto {
    @IsNotEmpty()
    @IsEnum(EvaluationType)
    type: EvaluationType;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    date: Date;
    @IsNotEmpty()
    @IsNumber()
    coefficient: number;


    @IsNotEmpty()
    @IsNumber()
    matiereId: number;

    @IsString()
    @IsNotEmpty()
    semestre: string;








}
