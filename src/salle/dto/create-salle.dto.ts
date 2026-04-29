import { IsNotEmpty, IsNumber, IsString, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class CreateSalleDto {
  @IsNotEmpty()
  @IsString()
  nom: string

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  capacite: number

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  departementId?: number
}
