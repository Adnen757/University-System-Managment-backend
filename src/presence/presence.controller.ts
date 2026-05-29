import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { PresenceService } from './presence.service';
import { CreatePresenceDto } from './dto/create-presence.dto';
import { UpdatePresenceDto } from './dto/update-presence.dto';

@Controller('presence')
export class PresenceController {
  constructor(private readonly presenceService: PresenceService) {}



  @Post()
 async create(@Body() createPresenceDto: CreatePresenceDto ,@Res()response) {
          try {
                  const newpresence=await this.presenceService.create(createPresenceDto)
                  return response.status(HttpStatus.CREATED).json({
                    message:"presence create avec succes",newpresence
                  })
                } catch (error) {
                 return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode : 400,
            message :"error lors de la creation de  presence"+error.message
                })
           }
  }






  @Get()
 async findAll(@Res()response) {
        try {
      const presence=await this.presenceService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all presence",presence
      })
      
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"error data not found"+error.message
    })
    }
  }










  @Get('etudiant/:etudiantId')
  async findByEtudiant(@Param('etudiantId') etudiantId: number, @Res() response) {
    try {
      const presences = await this.presenceService.findByEtudiant(etudiantId);
      return response.status(HttpStatus.OK).json({
        message: "this all presence", data: presences
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: "error finding presences " + error.message
      });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number,@Res()response) {
           try {
    const presence=await this.presenceService.findOne(id)
    return response.status(HttpStatus.OK).json({
        message:"this all presence",presence
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"presence de id "+id+" not found "+error.message
    })
   }
  }







  @Patch(':id')
 async update(@Param('id') id: number, @Body() updatePresenceDto: UpdatePresenceDto,@Res()response) {
       try {
    const presence=await this.presenceService.update(id,updatePresenceDto)
    return response.status(HttpStatus.OK).json({
        message:" presence update avec succsefly",presence
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"presence de id "+id+" not found "+error.message
    })
   }
  }







  @Delete(':id')
 async remove(@Param('id') id: number,@Res()response) {
         try {
    const presence=await this.presenceService.remove(id)
    return response.status(HttpStatus.OK).json({
        message:" presence  remove avec succsefly",presence
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"presence de id "+id+" not found "+error.message
    })
   }
  }

  @Post('start-ai')
  async startAI(@Res() response) {
    const result = this.presenceService.startAI();
    return response.status(HttpStatus.OK).json(result);
  }

  @Post('stop-ai')
  async stopAI(@Res() response) {
    const result = this.presenceService.stopAI();
    return response.status(HttpStatus.OK).json(result);
  }

  @Post('detect-from-image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const dir = path.join(process.cwd(), '..', 'stockage', 'temp');
          fs.mkdirSync(dir, { recursive: true });
          cb(null, dir);
        },
        filename: (req, file, cb) => {
          const unique = `scan_${Date.now()}${path.extname(file.originalname)}`;
          cb(null, unique);
        },
      }),
    }),
  )
  async detectFromImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('classeId') classeId: string,
    @Res() response,
  ) {
    try {
      if (!file) {
        return response.status(HttpStatus.BAD_REQUEST).json({ message: 'Aucun fichier fourni.' });
      }
      const result = await this.presenceService.detectFromImage(file.path, parseInt(classeId));
      // Supprimer le fichier temporaire après analyse
      fs.unlink(file.path, () => {});
      return response.status(HttpStatus.OK).json(result);
    } catch (error) {
      if (file?.path) fs.unlink(file.path, () => {});
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erreur lors de la détection faciale : ' + error.message,
      });
    }
  }
}
