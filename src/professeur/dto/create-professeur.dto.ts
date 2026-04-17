import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateProfesseurDto extends CreateUserDto {
    @IsNotEmpty()
    @IsString()
    ChargeHoraireSemestrielle: string;

    @IsNotEmpty()
    @IsNumber()
    departementId: number;
}
