import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { SemestreService } from './semestre.service';
import { CreateSemestreDto } from './dto/create-semestre.dto';
import { UpdateSemestreDto } from './dto/update-semestre.dto';
import { response } from 'express';

@Controller('semestre')
export class SemestreController {
  constructor(private readonly semestreService: SemestreService) {}

  @Post()
 async create(@Body() createSemestreDto: CreateSemestreDto ,@Res() response) {
           try {
                const newsemestre=await this.semestreService.create(createSemestreDto)
                return response.status(HttpStatus.CREATED).json({
                  message:"semestre create avec succes",newsemestre
                })
              } catch (error) {
               return response.status(HttpStatus.BAD_REQUEST).json({
          statusCode : 400,
          message :"error lors de la creation de  semestre"+error.message
              })
         }
  }






  @Get()
async  findAll(@Res() response) {
     try {
      const semestre=await this.semestreService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all semestre",semestre
      })
      
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"error data not found"+error.message
    })
    }
  }







  @Get(':id')
async  findOne(@Param('id') id: number ,@Res() response) {
       try {
    const semestre=await this.semestreService.findOne(id)
    return response.status(HttpStatus.OK).json({
        message:"this all semestre",semestre
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"semestre not found"+error.message
    })
   }
  }






  
  @Patch(':id')
async  update(@Param('id') id: number, @Body() updateSemestreDto: UpdateSemestreDto ,@Res() response) {
       try {
    const semestre=await this.semestreService.update(id,updateSemestreDto)
    return response.status(HttpStatus.OK).json({
        message:" semestre update avec succsefly",semestre
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"semestre not found"+error.message
    })
   }
  }





  @Delete(':id')
 async remove(@Param('id') id: number ,@Res() response) {
      try {
    const semestre=await this.semestreService.remove(id)
    return response.status(HttpStatus.OK).json({
        message:" semestre remove avec succsefly",semestre
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"semestre not found"+error.message
    })
   }
  }
}
