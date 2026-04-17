import { IsOptional } from "class-validator"

export class CreateInscriptionDto {


@IsOptional()
cin: string | number
@IsOptional()
matricule_bac: string | number
@IsOptional()
matriculeBac?: string | number
@IsOptional()
niveau:string
@IsOptional()
departementId: string | number

@IsOptional()
userId: string | number

@IsOptional()
photos?: string[]


}
