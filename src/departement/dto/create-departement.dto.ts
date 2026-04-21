import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateDepartementDto {
  // BUG FIX: @IsNotEmpty() was missing — empty string passed validation silently
  @IsNotEmpty({ message: 'Le code est requis' })
  @IsString()
  @MaxLength(6, { message: 'Le code ne peut pas dépasser 6 caractères' })
  code: string;

  @IsNotEmpty({ message: 'Le nom est requis' })
  @IsString()
  nom: string;

  @IsNotEmpty({ message: 'La description est requise' })
  @IsString()
  description: string;
}