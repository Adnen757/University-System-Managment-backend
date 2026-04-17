import { Module } from '@nestjs/common';

import { ClasseService } from './classe.service';

import { ClasseController } from './classe.controller';

import { Classe } from './entities/classe.entity';

import { Departement } from 'src/departement/entities/departement.entity';

import { TypeOrmModule } from '@nestjs/typeorm';



@Module({

   imports:[TypeOrmModule.forFeature([Classe, Departement])],

  controllers: [ClasseController],

  providers: [ClasseService],

})

export class ClasseModule {}

