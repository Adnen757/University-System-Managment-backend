import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Etudiant } from 'src/etudiant/entities/etudiant.entity';
import { Professeur } from 'src/professeur/entities/professeur.entity';
import { ChefDepartement } from 'src/chef-departement/entities/chef-departement.entity';
import { Administrateur } from 'src/administrateur/entities/administrateur.entity';
import { Inscription } from 'src/inscription/entities/inscription.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Etudiant,Professeur,ChefDepartement,Administrateur,Inscription])],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
