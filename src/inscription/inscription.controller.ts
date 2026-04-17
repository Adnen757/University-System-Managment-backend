import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { InscriptionService } from './inscription.service';
import { CreateInscriptionDto } from './dto/create-inscription.dto';
import { UpdateInscriptionDto } from './dto/update-inscription.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import {diskStorage} from "multer"
@Controller('inscription')
export class InscriptionController {
  constructor(private readonly inscriptionService: InscriptionService) {}




  @Post()
@UseInterceptors(FilesInterceptor("photos", 5, {
      storage:diskStorage({
        destination: './stockage',
        filename: (req, file, cb) => {
          cb(null , `${new Date().getTime()}${extname(file.originalname)}`)}
      })
    }))

 async create(@Body() createInscriptionDto: CreateInscriptionDto ,@Res()response,@UploadedFiles() photos) {
 try {
  console.log('DTO reçu:', createInscriptionDto);
  console.log('Photos reçues:', photos);

createInscriptionDto.photos = photos ? photos.map(p => p.filename) : []


                      const newinscription=await this.inscriptionService.create(createInscriptionDto)
                      return response.status(HttpStatus.CREATED).json({
                        message:"inscription create avec succes",newinscription
                      })
                    } catch (error) {
                     console.error('Erreur dans create:', error);
                     return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode : 400,
                message :"error lors de la creation de  inscription"+error.message
                    })
               }  }





  @Get()
 async findAll(@Res()response) {
      try {
      const inscription=await this.inscriptionService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all inscription",inscription
      })
      
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"error data not found"+error.message
    })
    }
  }






  @Get(':id')
 async findOne(@Param('id') id: number, @Res()response) {
            try {
    const inscription=await this.inscriptionService.findOne(id)
    return response.status(HttpStatus.OK).json({
        message:"inscription de id "+id+" est : ",inscription
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"inscription de id "+id+" not found "+error.message
    })
   }
  }






  @Patch(':id')
@UseInterceptors(FilesInterceptor("photos", 5, {
      storage:diskStorage({
        destination: './stockage',
        filename: (req, file, cb) => {
          cb(null , `${new Date().getTime()}${extname(file.originalname)}`)}
      })
    }))

 async update(@Param('id') id: number, @Body() updateInscriptionDto: UpdateInscriptionDto, @Res()response ,@UploadedFiles() photos) {
         try {
if (photos && photos.length > 0) {
  updateInscriptionDto.photos = photos.map(p => p.filename);
}


    const inscription=await this.inscriptionService.update(id,updateInscriptionDto)
    return response.status(HttpStatus.OK).json({
        message:" inscription  de id "+id+" est  update avec succsefly",inscription
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"inscription de id "+id+" not found "+error.message
    })
   }
  }

  @Delete(':id')
 async remove(@Param('id') id: number, @Res()response) {
          try {
    const inscription=await this.inscriptionService.remove(id)
    return response.status(HttpStatus.OK).json({
        message:" inscription de id "+id+" est remove avec succsefly",inscription
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"inscription de id "+id+" not found "+error.message
    })
   }
  }
}
