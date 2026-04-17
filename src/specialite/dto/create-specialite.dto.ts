import { IsNotEmpty, isNotEmpty, IsNumber, IsString } from "class-validator";



export class CreateSpecialiteDto {
    @IsNotEmpty()
    @IsString()
    code: string


    @IsNotEmpty()
    @IsString()
    nom: string


    @IsNotEmpty()
    @IsString()
    description: string


    @IsNotEmpty()
    @IsNumber()
    departementId: number





}
