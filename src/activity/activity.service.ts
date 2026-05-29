import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminActivity } from './entities/admin-activity.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(AdminActivity)
    private activityRepository: Repository<AdminActivity>
  ) {}

  async logAction(action: string, description: string) {
    try {
      const log = this.activityRepository.create({ action, description });
      await this.activityRepository.save(log);
    } catch (error) {
      console.error('Failed to log admin activity:', error);
    }
  }
}
