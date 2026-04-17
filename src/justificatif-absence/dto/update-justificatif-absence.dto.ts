import { PartialType } from '@nestjs/mapped-types';
import { CreateJustificatifAbsenceDto } from './create-justificatif-absence.dto';

export class UpdateJustificatifAbsenceDto extends PartialType(CreateJustificatifAbsenceDto) {}
