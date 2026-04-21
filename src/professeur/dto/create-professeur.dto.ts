import { IsNotEmpty, IsNumber, IsString, IsArray, IsOptional } from "class-validator";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateProfesseurDto extends CreateUserDto {
    @IsNotEmpty()
    @IsString()
    ChargeHoraireSemestrielle: string;

    @IsOptional()
    @IsString()
    matiere?: string;

    @IsNotEmpty()
    @IsNumber()
    departementId: number;

    @IsArray()
    @IsNumber({}, { each: true })
    @IsOptional()
    matiereIds?: number[];
}
