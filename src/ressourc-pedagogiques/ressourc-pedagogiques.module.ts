import { Module } from '@nestjs/common';
import { RessourcPedagogiquesService } from './ressourc-pedagogiques.service';
import { RessourcPedagogiquesController } from './ressourc-pedagogiques.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RessourcPedagogique } from './entities/ressourc-pedagogique.entity';
import { Matiere } from 'src/matiere/entities/matiere.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RessourcPedagogique, Matiere])],
  controllers: [RessourcPedagogiquesController],
  providers: [RessourcPedagogiquesService],
})
export class RessourcPedagogiquesModule { }
