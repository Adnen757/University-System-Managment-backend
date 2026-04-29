import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, NotFoundException, ParseIntPipe, Query } from '@nestjs/common';
import { EmploiDuTempsService } from './emploi-du-temps.service';
import { CreateEmploiDuTempsDto } from './dto/create-emploi-du-temps.dto';
import { UpdateEmploiDuTempsDto } from './dto/update-emploi-du-temps.dto';

@Controller('emploi-du-temps')
export class EmploiDuTempsController {
  constructor(private readonly emploiDuTempsService: EmploiDuTempsService) {}

  @Post()
  async create(@Body() createDto: CreateEmploiDuTempsDto, @Res() response) {
    try {
      const entry = await this.emploiDuTempsService.create(createDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Emploi du temps créé avec succès',
        emploiDuTemps: entry,
      });
    } catch (error) {
      const status = error instanceof NotFoundException ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST;
      return response.status(status).json({
        statusCode: status,
        message: error.message || 'Erreur lors de la création',
      });
    }
  }

  @Get()
  async findAll(@Query('departementId') departementId: string, @Query('classeId') classeId: string, @Query('professeurId') professeurId: string, @Res() response) {
    try {
      const deptId = departementId && !isNaN(+departementId) ? +departementId : undefined;
      const clId = classeId && !isNaN(+classeId) ? +classeId : undefined;
      const profId = professeurId && !isNaN(+professeurId) ? +professeurId : undefined;
      const entries = await this.emploiDuTempsService.findAll(deptId, clId, profId);
      return response.status(HttpStatus.OK).json({
        message: 'Liste des emplois du temps',
        emploisDuTemps: entries,
      });
    } catch (error) {
      const status = error instanceof NotFoundException ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST;
      return response.status(status).json({
        statusCode: status,
        message: error.message || 'Erreur lors de la récupération',
      });
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Res() response) {
    try {
      const entry = await this.emploiDuTempsService.findOne(id);
      return response.status(HttpStatus.OK).json({
        message: 'Emploi du temps trouvé',
        emploiDuTemps: entry,
      });
    } catch (error) {
      const status = error instanceof NotFoundException ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST;
      return response.status(status).json({
        statusCode: status,
        message: error.message || 'Emploi du temps non trouvé',
      });
    }
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateEmploiDuTempsDto, @Res() response) {
    try {
      const entry = await this.emploiDuTempsService.update(id, updateDto);
      return response.status(HttpStatus.OK).json({
        message: 'Emploi du temps mis à jour avec succès',
        emploiDuTemps: entry,
      });
    } catch (error) {
      const status = error instanceof NotFoundException ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST;
      return response.status(status).json({
        statusCode: status,
        message: error.message || 'Emploi du temps non trouvé',
      });
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Res() response) {
    try {
      await this.emploiDuTempsService.remove(id);
      return response.status(HttpStatus.OK).json({
        message: 'Emploi du temps supprimé avec succès',
      });
    } catch (error) {
      const status = error instanceof NotFoundException ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST;
      return response.status(status).json({
        statusCode: status,
        message: error.message || 'Emploi du temps non trouvé',
      });
    }
  }
}
