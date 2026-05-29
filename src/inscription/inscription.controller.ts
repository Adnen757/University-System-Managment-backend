import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseInterceptors, UploadedFiles, Query } from '@nestjs/common';
import { InscriptionService } from './inscription.service';
import { CreateInscriptionDto } from './dto/create-inscription.dto';
import { UpdateInscriptionDto } from './dto/update-inscription.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from "multer";
import * as fs from 'fs';
import * as path from 'path';

@Controller('inscription')
export class InscriptionController {
  constructor(private readonly inscriptionService: InscriptionService) { }

  @Post('capture')
  async captureWebcamImages(@Body() body: { studentId: string | number; studentName: string; images: string[] }, @Res() response) {
    try {
      const { studentId, studentName, images } = body;
      
      if (!studentId || !studentName || !images || !Array.isArray(images) || images.length === 0) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: 400,
          message: "Données de capture incomplètes. Veuillez fournir studentId, studentName et des images."
        });
      }

      // Nettoyer le nom de l'étudiant (remplace espaces par tirets bas, enlève points et accents)
      const cleanName = studentName
        .replace(/\./g, '')
        .replace(/\s+/g, '_')
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      // Chemins des dossiers TrainingImage
      const aiBasePath = path.resolve(__dirname, '..', '..', '..', 'ai');
      const targetPaths = [
        path.join(aiBasePath, 'face-api', 'TrainingImage'),
        path.join(aiBasePath, 'Face-Recognition-Attendance-System', 'FRAS', 'TrainingImage')
      ];

      // Assurer la création des dossiers
      for (const targetPath of targetPaths) {
        if (fs.existsSync(path.dirname(targetPath))) {
          if (!fs.existsSync(targetPath)) {
            fs.mkdirSync(targetPath, { recursive: true });
          }
        }
      }

      let count = 0;
      for (let i = 0; i < images.length; i++) {
        const base64Data = images[i];
        if (!base64Data.startsWith('data:image')) continue;

        // Décoder le base64
        const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) continue;

        const buffer = Buffer.from(matches[2], 'base64');
        const sampleNum = i + 1;
        const filename = `${cleanName}.${studentId}.${sampleNum}.jpg`;

        // Enregistrer dans chaque dossier valide
        for (const targetPath of targetPaths) {
          if (fs.existsSync(path.dirname(targetPath))) {
            const filepath = path.join(targetPath, filename);
            fs.writeFileSync(filepath, buffer);
          }
        }
        count++;
      }

      console.log(`[CAPTURE] Sauvegardé ${count} images pour ${cleanName} (ID: ${studentId})`);

      return response.status(HttpStatus.OK).json({
        statusCode: 200,
        message: `${count} images faciales ont été enregistrées avec succès pour ${studentName}.`,
        count
      });

    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la capture :", error);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: 500,
        message: "Erreur lors de la sauvegarde des images de capture : " + error.message
      });
    }
  }

  @Post()
  async create(@Body() createInscriptionDto: CreateInscriptionDto, @Res() response) {
    try {
      console.log('DTO reçu:', createInscriptionDto);

      const newinscription = await this.inscriptionService.create(createInscriptionDto)
      return response.status(HttpStatus.CREATED).json({
        message: "inscription create avec succes", newinscription
      })
    } catch (error) {
      console.error('Erreur dans create:', error);
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: "error lors de la creation de  inscription" + error.message
      })
    }
  }





  @Get()
  async findAll(@Res() response, @Query('classeId') classeId?: number) {
    try {
      const inscription = await this.inscriptionService.findAll(classeId)
      return response.status(HttpStatus.OK).json({
        message: "this all inscription", inscription
      })

    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: "error data not found" + error.message
      })
    }
  }






  @Get(':id')
  async findOne(@Param('id') id: number, @Res() response) {
    try {
      const inscription = await this.inscriptionService.findOne(id)
      return response.status(HttpStatus.OK).json({
        message: "inscription de id " + id + " est : ", inscription
      })

    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: "inscription de id " + id + " not found " + error.message
      })
    }
  }






  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateInscriptionDto: UpdateInscriptionDto, @Res() response) {
    try {
      const inscription = await this.inscriptionService.update(id, updateInscriptionDto)
      return response.status(HttpStatus.OK).json({
        message: " inscription  de id " + id + " est  update avec succsefly", inscription
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: "inscription de id " + id + " not found " + error.message
      })
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Res() response) {
    try {
      const inscription = await this.inscriptionService.remove(id)
      return response.status(HttpStatus.OK).json({
        message: " inscription de id " + id + " est remove avec succsefly", inscription
      })

    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: "inscription de id " + id + " not found " + error.message
      })
    }
  }
}
