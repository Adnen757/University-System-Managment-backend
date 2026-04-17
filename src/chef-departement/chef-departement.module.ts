import { Module } from '@nestjs/common';
import { ChefDepartementService } from './chef-departement.service';
import { ChefDepartementController } from './chef-departement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChefDepartement } from './entities/chef-departement.entity';

import { Departement } from 'src/departement/entities/departement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChefDepartement, Departement])],
  controllers: [ChefDepartementController],
  providers: [ChefDepartementService],
})
export class ChefDepartementModule { }
