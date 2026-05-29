import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminActivity } from './entities/admin-activity.entity';
import { ActivityService } from './activity.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([AdminActivity])],
  providers: [ActivityService],
  exports: [ActivityService],
})
export class ActivityModule {}
