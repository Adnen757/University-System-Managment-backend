import { Module } from '@nestjs/common';
import { SpecialiteService } from './specialite.service';
import { SpecialiteController } from './specialite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specialite } from './entities/specialite.entity';
import { Departement } from 'src/departement/entities/departement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Specialite, Departement])],
  controllers: [SpecialiteController],
  providers: [SpecialiteService],
})
export class SpecialiteModule { }
