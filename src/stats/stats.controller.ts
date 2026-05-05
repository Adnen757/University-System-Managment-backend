import { Controller, Get, Query, Res } from '@nestjs/common';
import { StatsService } from './stats.service';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  async getDepartmentStats(@Query('departementId') departementId: string, @Res() response) {
    try {
      const deptId = departementId && !isNaN(+departementId) ? +departementId : null;
      if (!deptId) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          message: 'departementId is required',
        });
      }
      const stats = await this.statsService.getDepartmentStats(deptId);
      return response.status(HttpStatus.OK).json({
        message: 'Department statistics',
        stats,
      });
     
      
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error fetching statistics',
        error: err.message,
      });
    }
  }
}
