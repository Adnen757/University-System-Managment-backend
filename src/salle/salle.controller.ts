import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { SalleService } from './salle.service';
import { CreateSalleDto } from './dto/create-salle.dto';
import { UpdateSalleDto } from './dto/update-salle.dto';

@Controller('salle')
export class SalleController {
  constructor(private readonly salleService: SalleService) {}



  @Post()
async  create(@Body() createSalleDto: CreateSalleDto ,@Res()response) {
          try {
             const newsalle=await this.salleService.create(createSalleDto)
             return response.status(HttpStatus.CREATED).json({
               message:"salle create avec succes",newsalle
             })
           } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({
       statusCode : 400,
       message :"error lors de la creation de  salle"+error.message
           })
      }
  }






  @Get()
 async findAll(@Res() response) {
        try {
      const salle=await this.salleService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all salle",salle
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
    const salle=await this.salleService.findOne(id)
    return response.status(HttpStatus.OK).json({
        message:"this all salle",salle
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"salle not found"+error.message
    })
   }
  }









  @Patch(':id')
async update(@Param('id') id: number, @Body() updateSalleDto: UpdateSalleDto,@Res() response) {
      try {
    const salle=await this.salleService.update(id,updateSalleDto)
    return response.status(HttpStatus.OK).json({
        message:" salle update avec succsefly",salle
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"salle not found"+error.message
    })
   }
  }









  @Delete(':id')
async remove(@Param('id') id: number,@Res() response) {
       try {
    const salle=await this.salleService.remove(id)
    return response.status(HttpStatus.OK).json({
        message:" salle remove avec succsefly",salle
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"salle not found"+error.message
    })
   }
  }
}
