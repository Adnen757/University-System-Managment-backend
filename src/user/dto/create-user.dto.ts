import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator"

export class CreateUserDto {
   @IsString()
   @IsNotEmpty()
    fullname:string

  


    @IsEmail()
    @IsNotEmpty()
    email:string


  //  @Min(6)
    @IsString()
    password:string

   
    @IsString()
    @IsOptional()
    role:string


    

@IsOptional()
@IsString()
refreshToken?: string | null


}
