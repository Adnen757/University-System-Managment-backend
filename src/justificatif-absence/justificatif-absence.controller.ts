import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { JustificatifAbsenceService } from './justificatif-absence.service';
import { CreateJustificatifAbsenceDto } from './dto/create-justificatif-absence.dto';
import { UpdateJustificatifAbsenceDto } from './dto/update-justificatif-absence.dto';

@Controller('justificatif-absence')
export class JustificatifAbsenceController {
  constructor(private readonly justificatifAbsenceService: JustificatifAbsenceService) {}




  @Post()
 async create(@Body() createJustificatifAbsenceDto: CreateJustificatifAbsenceDto ,@Res()response) {
     try {
                     const newjusticatif=await this.justificatifAbsenceService.create(createJustificatifAbsenceDto)
                     return response.status(HttpStatus.CREATED).json({
                       message:"justificatif create avec succes",newjusticatif
                     })
                   } catch (error) {
                    return response.status(HttpStatus.BAD_REQUEST).json({
               statusCode : 400,
               message :"error lors de la creation de  justificatif"+error.message
                   })
              }
  }





  @Get()
async  findAll(@Res()response) {
        try {
      const justificatif=await this.justificatifAbsenceService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all justificatif",justificatif
      })
      
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"error data not found"+error.message
    })
    }
  }





  @Get(':id')
async  findOne(@Param('id') id: number,@Res()response) {
           try {
    const justificatif=await this.justificatifAbsenceService.findOne(id)
    return response.status(HttpStatus.OK).json({
        message:"this all justificatif",justificatif
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"justificatif not found"+error.message
    })
   }
  }





  @Patch(':id')
 async update(@Param('id') id: number, @Body() updateJustificatifAbsenceDto: UpdateJustificatifAbsenceDto,@Res()response) {
          try {
    const justificatif=await this.justificatifAbsenceService.update(id,updateJustificatifAbsenceDto)
    return response.status(HttpStatus.OK).json({
        message:" justificatif update avec succsefly",justificatif
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"justificatif not found"+error.message
    })
   }
  }







  @Delete(':id')
 async remove(@Param('id') id: number,@Res()response) {
          try {
    const justificatif=await this.justificatifAbsenceService.remove(id)
    return response.status(HttpStatus.OK).json({
        message:" justificatif remove avec succsefly",justificatif
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"justificatif not found"+error.message
    })
   }
  }
}
