import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { Type } from "class-transformer"
import { CreateUserDto } from "src/user/dto/create-user.dto"

export class CreateEtudiantDto extends CreateUserDto {

  

@Type(() => Number)
   @IsNotEmpty()
   @IsNumber()
   departementId: number;
}
