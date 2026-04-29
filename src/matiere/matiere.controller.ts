import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Query } from '@nestjs/common';
import { MatiereService } from './matiere.service';
import { CreateMatiereDto } from './dto/create-matiere.dto';
import { UpdateMatiereDto } from './dto/update-matiere.dto';

@Controller('matiere')
export class MatiereController {
  constructor(private readonly matiereService: MatiereService) {}


  @Post()
async  create(@Body() createMatiereDto: CreateMatiereDto ,@Res()response) {
        try {
                      const newMatiere=await this.matiereService.create(createMatiereDto)
                      return response.status(HttpStatus.CREATED).json({
                        message:"matiere create avec succes",newMatiere
                      })
                    } catch (error) {
                     return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode : 400,
                message :"error lors de la creation de  matiere"+error.message
                    })
               }
  }





  @Get()
async  findAll(@Res()response, @Query('departementId') departementId?: number) {
      try {
      const matieres=await this.matiereService.findAll(departementId)
      return response.status(HttpStatus.OK).json({
        message:"this all matieres",matieres
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
    const matiere=await this.matiereService.findOne(id)
    return response.status(HttpStatus.OK).json({
        message:"this matiere de id "+id,matiere
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"matiere not found"+error.message
    })
   }
  }






  @Patch(':id')
async  update(@Param('id') id: number, @Body() updateMatiereDto: UpdateMatiereDto,@Res()response) {
     try {
    const matiere=await this.matiereService.update(id,updateMatiereDto)
    return response.status(HttpStatus.OK).json({
        message:" matiere update avec succsefly",matiere
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"matiere not found"+error.message
    })
   }
  }

  @Delete(':id')
async  remove(@Param('id') id: number,@Res()response) {
         try {
    const matiere=await this.matiereService.remove(id)
    return response.status(HttpStatus.OK).json({
        message:" matiere remove avec succsefly",matiere
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"matiere not found"+error.message
    })
   }
  }
}
