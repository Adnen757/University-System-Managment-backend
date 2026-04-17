import { IsEmail, IsNotEmpty, IsString, IsOptional } from "class-validator";

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  role: string;
}
