import { Controller, Post, Body, Get, Patch, Delete, Param, Res, HttpStatus } from '@nestjs/common';
import { EtudiantImportService } from './etudiant-import.service';

@Controller('etudiant-import')
export class EtudiantImportController {
  constructor(private readonly etudiantImportService: EtudiantImportService) {}

  @Post('bulk')
  async createBulk(@Body() etudiants: { nom: string; cin: string; departementId: number }[], @Res() response) {
    try {
      const result = await this.etudiantImportService.createBulk(etudiants);
      return response.status(HttpStatus.CREATED).json({
        message: 'Étudiants importés avec succès',
        data: result,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Erreur lors de l\'importation : ' + error.message,
      });
    }
  }

  @Get()
  async findAll(@Res() response) {
    try {
      const data = await this.etudiantImportService.findAll();
      return response.status(HttpStatus.OK).json({ data });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Erreur : ' + error.message,
      });
    }
  }

  @Post('verify-name')
  async verifyName(@Body() body: { nom: string }, @Res() response) {
    try {
      const isValid = await this.etudiantImportService.verifyName(body.nom);
      return response.status(HttpStatus.OK).json({ valid: isValid });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: error.message,
      });
    }
  }

  @Post('verify-inscription')
  async verifyInscription(@Body() body: { nom: string; cin: string; departementId: number }, @Res() response) {
    try {
      const isValid = await this.etudiantImportService.verifyInscription(body.nom, body.cin, +body.departementId);
      return response.status(HttpStatus.OK).json({ valid: isValid });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: error.message,
      });
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateData: { nom?: string; cin?: string; departementId?: number }, @Res() response) {
    try {
      const updated = await this.etudiantImportService.update(+id, updateData);
      return response.status(HttpStatus.OK).json({ message: 'Mis à jour  '+ id + ' avec succès', data: updated });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response) {
    try {
      await this.etudiantImportService.remove(+id);
      return response.status(HttpStatus.OK).json({ message: 'Supprimé '+ id + ' avec succès' });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}
