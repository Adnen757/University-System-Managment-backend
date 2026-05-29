import { Controller, Get, Query, Res, Param } from '@nestjs/common';
import { StatsService } from './stats.service';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('admin')
  async getAdminStats(@Res() response) {
    try {
      const stats = await this.statsService.getAdminStats();
      return response.status(HttpStatus.OK).json({
        message: 'Admin Dashboard statistics',
        stats,
      });
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error fetching admin statistics',
        error: err.message,
      });
    }
  }

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

  @Get('professeur/:id')
  async getProfesseurStats(@Param('id') id: string, @Res() response: Response) {
    try {
      const professeurId = parseInt(id, 10);
      if (isNaN(professeurId)) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          message: 'L\'ID du professeur est invalide',
        });
      }
      const stats = await this.statsService.getProfesseurStats(professeurId);
      return response.status(HttpStatus.OK).json({
        message: 'Statistiques du professeur récupérées avec succès',
        stats,
      });
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erreur lors de la récupération des statistiques',
        error: err.message,
      });
    }
  }
}
