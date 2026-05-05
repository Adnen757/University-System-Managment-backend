import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMessageDto {
    @IsNotEmpty()
    @IsString()
    contenu: string

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    dateEnvoi?: Date

    @IsOptional()
    @IsBoolean()
    lu?: boolean

    @IsNotEmpty()
    @IsNumber()
    senderId: number

    @IsNotEmpty()
    @IsNumber()
    receiverId: number
}
