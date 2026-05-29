import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EtudiantImportService } from './etudiant-import.service';
import { EtudiantImportController } from './etudiant-import.controller';
import { EtudiantImport } from './entities/etudiant-import.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EtudiantImport, User])],
  controllers: [EtudiantImportController],
  providers: [EtudiantImportService],
})
export class EtudiantImportModule {}
