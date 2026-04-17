import { PartialType } from '@nestjs/mapped-types';
import { CreateChefDepartementDto } from './create-chef-departement.dto';

export class UpdateChefDepartementDto extends PartialType(CreateChefDepartementDto) {}
