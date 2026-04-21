import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { Administrateur } from '../administrateur/entities/administrateur.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Administrateur])],
  providers: [SeedService],
})
export class DatabaseModule {}
