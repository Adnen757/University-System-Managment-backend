import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { ProfesseurService } from './professeur.service';
import { CreateProfesseurDto } from './dto/create-professeur.dto';
import { UpdateProfesseurDto } from './dto/update-professeur.dto';
import { response } from 'express';

@Controller('professeur')
export class ProfesseurController {
  constructor(private readonly professeurService: ProfesseurService) {}




  @Post()
 async create(@Body() createProfesseurDto: CreateProfesseurDto,@Res() response) {
 try {
         const newprofesseur=await this.professeurService.create(createProfesseurDto)
         return response.status(HttpStatus.CREATED).json({
           message:"professeur create avec succes",newprofesseur
         })
       } catch (error) {
        return response.status(HttpStatus.BAD_REQUEST).json({
   statusCode : 400,
   message :"error lors de la creation de professeur "+error.message
       })}   }






  @Get()
 async findAll(@Res() response) {
  try {
      const professeur=await this.professeurService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all professeur ",professeur
      })
      
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"error data not found"+error.message
    })
    }   }





  @Get(':id')
 async findOne(@Param('id') id: number,@Res() response) {
 try {
    const professeur=await this.professeurService.findOne(id)
    return response.status(HttpStatus.OK).json({
        message:"this all professeur ",professeur
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"professeur  not found"+error.message
    })
   }  }





  @Patch(':id')
 async update(@Param('id') id: number, @Body() updateProfesseurDto: UpdateProfesseurDto,@Res() response) {
  try {
    const professeur=await this.professeurService.update(id,updateProfesseurDto)
    return response.status(HttpStatus.OK).json({
        message:" professeur update avec succsefly",professeur
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"professeur not found"+error.message
    })
   }  }





  @Delete(':id')
 async remove(@Param('id') id: number,@Res() response) {
     try {
    const professeur=await this.professeurService.remove(id)
    return response.status(HttpStatus.OK).json({
        message:" professeur remove avec succsefly",professeur
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"professeur not found"+error.message
    })
   }  }
}
