import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Administrateur } from '../administrateur/entities/administrateur.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Administrateur)
    private administrateurRepository: Repository<Administrateur>,
  ) {}

  async onModuleInit() {
    await this.seedDefaultAdmin();
  }

  private async seedDefaultAdmin() {
    const adminEmail = 'admin.iset@gmail.com';
    
    // Check if admin already exists
    const existingAdmin = await this.administrateurRepository.findOne({
      where: { email: adminEmail },
    });

    if (!existingAdmin) {
      const defaultAdmin = this.administrateurRepository.create({
        fullname: 'Administrateur ISET',
        email: adminEmail,
        password: 'admin123',
        role: 'Administrateur',
      });

      await this.administrateurRepository.save(defaultAdmin);
      console.log('✅ Default admin account created:');
      console.log('   Email: admin.iset@gmail.com');
      console.log('   Password: admin123');
    } else {
      console.log('ℹ️ Default admin account already exists');
    }
  }

}
