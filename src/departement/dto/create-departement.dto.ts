import { IsNotEmpty, IsString } from "class-validator";

export class CreateDepartementDto {
    @IsString()
    
    code:string
@IsNotEmpty()
 @IsString()
   nom:string

@IsNotEmpty()
 @IsString()
 description:string

}
