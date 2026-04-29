import { PartialType } from "@nestjs/mapped-types";
import { CreateEmploiDuTempsDto } from "./create-emploi-du-temps.dto";

export class UpdateEmploiDuTempsDto extends PartialType(CreateEmploiDuTempsDto) {}
