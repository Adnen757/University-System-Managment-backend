import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
export enum annonceType{
        ETUDIANT="ETUDIANT",
    CHEF_DEPARTEMENT="CHEF_DEPARTEMENT",
    ENSEIGNANT="ENSEIGNANT",
        
    
}
export class CreateAnnonceDto {

@IsNotEmpty()
@IsString()
   title:string
  
@IsNotEmpty()
@IsString()
contenu:string

@IsNotEmpty()
@IsString()
datePublication:string

@IsNotEmpty()
cibleRole:annonceType


@IsNotEmpty()
@IsString()
cibleDepartement:string


@IsNumber()
@IsOptional()
user:number
}
