import { PartialType } from '@nestjs/mapped-types';
import { CreateRessourcPedagogiqueDto } from './create-ressourc-pedagogique.dto';

export class UpdateRessourcPedagogiqueDto extends PartialType(CreateRessourcPedagogiqueDto) {}
