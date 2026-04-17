import { IsOptional } from "class-validator";

export class CreateClasseDto {



@IsOptional()
nom: string;
@IsOptional()
niveau: string;
@IsOptional()
departementId: number;

}
