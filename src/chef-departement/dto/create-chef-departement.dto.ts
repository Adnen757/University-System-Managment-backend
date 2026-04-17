import { CreateUserDto } from "src/user/dto/create-user.dto";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateChefDepartementDto extends CreateUserDto {
    @IsNotEmpty()
    @IsNumber()
    departementId: number;
}
