import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { AnneeUniversitaireService } from './annee-universitaire.service';
import { CreateAnneeUniversitaireDto } from './dto/create-annee-universitaire.dto';
import { UpdateAnneeUniversitaireDto } from './dto/update-annee-universitaire.dto';
import { response } from 'express';
import { AccessTokenGuard } from 'src/common/guards/accesToken.guard';
@UseGuards(AccessTokenGuard)
@Controller('annee-universitaire')
export class AnneeUniversitaireController {
  constructor(private readonly anneeUniversitaireService: AnneeUniversitaireService) {}




  @Post()
 async create(@Body() createAnneeUniversitaireDto: CreateAnneeUniversitaireDto ,@Res() response) {
        try {
               const newanneeUniversitaire=await this.anneeUniversitaireService.create(createAnneeUniversitaireDto)
               return response.status(HttpStatus.CREATED).json({
                 message:"annee Universitaire create avec succes",newanneeUniversitaire
               })
             } catch (error) {
              return response.status(HttpStatus.BAD_REQUEST).json({
         statusCode : 400,
         message :"error lors de la creation de  annee Universitaire"+error.message
             })
        }
  }









  @Get()
 async findAll(@Res() response) {
        try {
      const anneeUniversitaire=await this.anneeUniversitaireService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all annee Universitaire",anneeUniversitaire
      })
      
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"error data not found"+error.message
    })
    }
  }






  @Get(':id')
 async findOne(@Param('id') id: number,@Res() response) {
               try {
    const anneeUniversitaire=await this.anneeUniversitaireService.findOne(id)
    return response.status(HttpStatus.OK).json({
        message:"this all annee Universitaire",anneeUniversitaire
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"annee Universitaire not found"+error.message
    })
   }
  }









  @Patch(':id')
 async update(@Param('id') id: number, @Body() updateAnneeUniversitaireDto: UpdateAnneeUniversitaireDto,@Res() response) {
        try {
    const anneeUniversitaire=await this.anneeUniversitaireService.update(id,updateAnneeUniversitaireDto)
    return response.status(HttpStatus.OK).json({
        message:" annee Universitaire update avec succsefly",anneeUniversitaire
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"annee Universitairecd not found"+error.message
    })
   }
  }






  @Delete(':id')
 async remove(@Param('id') id: number,@Res() response) {
           try {
    const anneeUniversitaire=await this.anneeUniversitaireService.remove(id)
    return response.status(HttpStatus.OK).json({
        message:" annee Universitaire remove avec succsefly",anneeUniversitaire
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"annee Universitaire not found"+error.message
    })
   }
  }
}
