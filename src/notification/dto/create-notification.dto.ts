import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { NotificationType } from "../entities/notification.entity";

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  titre: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsEnum(NotificationType)
  type: NotificationType;

  @IsBoolean()
  @IsOptional()
  lu?: boolean;
  @IsNumber()
  @IsOptional()
  user:number;
}