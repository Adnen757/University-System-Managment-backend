import { Module } from '@nestjs/common';
import { AnnonceService } from './annonce.service';
import { AnnonceController } from './annonce.controller';
import { Annonce } from './entities/annonce.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Annonce , User])],
  controllers: [AnnonceController],
  providers: [AnnonceService],
})
export class AnnonceModule {}
