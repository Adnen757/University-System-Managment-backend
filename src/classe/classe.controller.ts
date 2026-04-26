import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Query } from '@nestjs/common';
import { ClasseService } from './classe.service';
import { CreateClasseDto } from './dto/create-classe.dto';
import { UpdateClasseDto } from './dto/update-classe.dto';

@Controller('classe')
export class ClasseController {
  constructor(private readonly classeService: ClasseService) {}




  @Post()
async  create(@Body() createClasseDto: CreateClasseDto ,@Res() response) {
      try {
            const newClasse=await this.classeService.create(createClasseDto)
            return response.status(HttpStatus.CREATED).json({
              message:"classe create avec succes",newClasse
            })
          } catch (error) {
           return response.status(HttpStatus.BAD_REQUEST).json({
      statusCode : 400,
      message :"error lors de la creation de classe "+error.message
          })}
  }






  @Get()
 async findAll(@Res() response, @Query('departementId') departementId?: number) {
     try {
      const classe=await this.classeService.findAll(departementId)
      return response.status(HttpStatus.OK).json({
        message:"this all classe ",classe
      })

    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"error data not found"+error.message
    })
    }
  }





  @Get(':id')
 async findOne(@Param('id') id: number, @Res() response) {
        try {
    const classe=await this.classeService.findOne(id)
    return response.status(HttpStatus.OK).json({
        message:"classe de id "+id+" est : ",classe
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"classe de id "+id+" not found "+error.message
    })
   }
  }





  @Patch(':id')
async  update(@Param('id') id: number, @Body() updateClasseDto: UpdateClasseDto, @Res() response) {
      try {
    const classe=await this.classeService.update(id,updateClasseDto)
    return response.status(HttpStatus.OK).json({
        message:" classe de id "+id+" update avec succsefly",classe
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"classe de id "+id+" not found "+error.message
    })
   }
  }






  @Delete(':id')
 async remove(@Param('id') id: number, @Res() response) {
     try {
      console.log('Deleting classe with id:', id);
    const classe=await this.classeService.remove(id)
    return response.status(HttpStatus.OK).json({
        message:" classe de id "+id+" remove avec succsefly",classe
      })

   } catch (error) {
    console.error('Error deleting classe:', error);
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"classe de id "+id+" not found "+error.message,
details: error
    })
   }
  }
}
