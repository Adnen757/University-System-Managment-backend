import { Module } from '@nestjs/common';
import { EmploiDuTempsService } from './emploi-du-temps.service';
import { EmploiDuTempsController } from './emploi-du-temps.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmploiDuTemps } from './entities/emploi-du-temps.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmploiDuTemps])],
  controllers: [EmploiDuTempsController],
  providers: [EmploiDuTempsService],
})
export class EmploiDuTempsModule {}
