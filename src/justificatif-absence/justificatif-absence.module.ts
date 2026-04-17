import { Module } from '@nestjs/common';
import { JustificatifAbsenceService } from './justificatif-absence.service';
import { JustificatifAbsenceController } from './justificatif-absence.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JustificatifAbsence } from './entities/justificatif-absence.entity';

@Module({
  imports:[TypeOrmModule.forFeature([JustificatifAbsence])],
  controllers: [JustificatifAbsenceController],
  providers: [JustificatifAbsenceService],
})
export class JustificatifAbsenceModule {}
