import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { AnnonceService } from './annonce.service';
import { CreateAnnonceDto } from './dto/create-annonce.dto';
import { UpdateAnnonceDto } from './dto/update-annonce.dto';

@Controller('annonce')
export class AnnonceController {
  constructor(private readonly annonceService: AnnonceService) {}

  @Post()
 async create(@Body() createAnnonceDto: CreateAnnonceDto , @Res()response) {
      try {
         const newannonce=await this.annonceService.create(createAnnonceDto)
         return response.status(HttpStatus.CREATED).json({
           message:"annonce create avec succes",newannonce
         })
       } catch (error) {
        return response.status(HttpStatus.BAD_REQUEST).json({
   statusCode : 400,
   message :"error lors de la creation de  annonce"+error
       })
  }
  }





  @Get()
 async findAll(@Res() response) {
     try {
      const annonce=await this.annonceService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all annonce",annonce
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
    const annonce=await this.annonceService.findOne(id)
    return response.status(HttpStatus.OK).json({
        message:"this all annonce",annonce
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"annonce not found"+error.message
    })
   }
  }






  @Patch(':id')
 async update(@Param('id') id: number, @Body() updateAnnonceDto: UpdateAnnonceDto,@Res()response) {
   try {
    const annonce=await this.annonceService.update(id,updateAnnonceDto)
    return response.status(HttpStatus.OK).json({
        message:" annonce update avec succsefly",annonce
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"annonce not found"+error.message
    })
   }  }





  @Delete(':id')
 async remove(@Param('id') id: number,@Res()response) {
      try {
    const annonce=await this.annonceService.remove(id)
    return response.status(HttpStatus.OK).json({
        message:" annonce remove avec succsefly",annonce
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"annonce not found"+error.message
    })
   }
  }
}
