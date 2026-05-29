import { Module } from '@nestjs/common';
import { RessourcPedagogiquesService } from './ressourc-pedagogiques.service';
import { RessourcPedagogiquesController } from './ressourc-pedagogiques.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RessourcPedagogique } from './entities/ressourc-pedagogique.entity';
import { Matiere } from 'src/matiere/entities/matiere.entity';
import { Classe } from 'src/classe/entities/classe.entity';
import { Inscription } from 'src/inscription/entities/inscription.entity';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RessourcPedagogique, Matiere, Classe, Inscription]),
    NotificationModule
  ],
  controllers: [RessourcPedagogiquesController],
  providers: [RessourcPedagogiquesService],
})
export class RessourcPedagogiquesModule { }
