import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMessageDto {



    @IsNotEmpty ()
    @IsString()
    contenu:string
@IsNotEmpty ()
    @IsDate()
    @Type   (() => Date)
dateEnvoi:Date


@IsNotEmpty ()
@IsBoolean()
lu:boolean



@IsNumber()
@IsOptional()
user:number
}
