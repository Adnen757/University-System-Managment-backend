import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { JourSemaine, TypeSeance } from "../entities/emploi-du-temps.entity";

export class CreateEmploiDuTempsDto {
  @IsEnum(JourSemaine)
  jour: JourSemaine;

  @IsNumber()
  seanceIndex: number;

  @IsOptional()
  @IsString()
  heureDebut?: string;

  @IsOptional()
  @IsString()
  heureFin?: string;

  @IsOptional()
  @IsNumber()
  professeurId?: number;

  @IsOptional()
  @IsNumber()
  matiereId?: number;

  @IsOptional()
  @IsNumber()
  salleId?: number;

  @IsOptional()
  @IsEnum(TypeSeance)
  type?: TypeSeance;

  @IsOptional()
  @IsNumber()
  departementId?: number;

  @IsOptional()
  @IsNumber()
  classeId?: number;

  @IsOptional()
  @IsString()
  classNom?: string;
}
