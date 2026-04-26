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

    // TODO: Réactiver après synchronisation de la base de données
     @IsOptional()
    @IsNumber()
    departementId?: number

    @IsOptional()
    @IsString()
    refreshToken?: string | null


}
