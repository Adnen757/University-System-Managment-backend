import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { AdministrateurService } from './administrateur.service';
import { CreateAdministrateurDto } from './dto/create-administrateur.dto';
import { UpdateAdministrateurDto } from './dto/update-administrateur.dto';
import { response } from 'express';

@Controller('administrateur')
export class AdministrateurController {
  constructor(private readonly administrateurService: AdministrateurService) {}

  @Post()
 async create(@Body() createAdministrateurDto: CreateAdministrateurDto , @Res() response) {
         try {   
  const newAdministrateur=await this.administrateurService.create(createAdministrateurDto)
                 return response.status(HttpStatus.CREATED).json({
                   message:"Administrateur create avec succes",newAdministrateur
                 })
               } catch (error) {
                return response.status(HttpStatus.BAD_REQUEST).json({
           statusCode : 400,
           message :"error lors de la creation de Administrateur  "+error.message
               })}
  }







  @Get()
 async findAll(@Res() response) {
     try {
      const administrateur=await this.administrateurService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all administrateur ",administrateur
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
    const administrateur=await this.administrateurService.findOne(id)
    return response.status(HttpStatus.OK).json({
        message:"this all administrateur ",administrateur
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"administrateur  not found"+error.message
    })
   } 
  }





  @Patch(':id')
 async update(@Param('id') id: number, @Body() updateAdministrateurDto: UpdateAdministrateurDto, @Res() response) {
      try {
     const administrateur=await this.administrateurService.update(id,updateAdministrateurDto)
    return response.status(HttpStatus.OK).json({
        message:" administrateur update avec succsefly",administrateur
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"administrateur not found"+error.message
    })
   }
  }






  @Delete(':id')
 async remove(@Param('id') id: number, @Res() response) {
        try {
    const administrateur=await this.administrateurService.remove(id)
    return response.status(HttpStatus.OK).json({
        message:" administrateur remove avec succsefly",administrateur
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"administrateur not found"+error.message
    })
   }
  }
}
