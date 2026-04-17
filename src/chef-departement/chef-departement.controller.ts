import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { ChefDepartementService } from './chef-departement.service';
import { CreateChefDepartementDto } from './dto/create-chef-departement.dto';
import { UpdateChefDepartementDto } from './dto/update-chef-departement.dto';
import { response } from 'express';

@Controller('chef-departement')
export class ChefDepartementController {
  constructor(private readonly chefDepartementService: ChefDepartementService) {}

  @Post()
 async create(@Body() createChefDepartementDto: CreateChefDepartementDto, @Res() response) {
try {
             const newChefDepartement=await this.chefDepartementService.create(createChefDepartementDto)
             return response.status(HttpStatus.CREATED).json({
               message:"ChefDepartement create avec succes",newChefDepartement
             })
           } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({
       statusCode : 400,
       message :"error lors de la creation de ChefDepartement  "+error.message
           })}
  


          }









  @Get()
 async findAll(@Res() response) {
    try {
      const ChefDepartement=await this.chefDepartementService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all chef departement ",ChefDepartement
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
    const chefDepartement=await this.chefDepartementService.findOne(id)
    return response.status(HttpStatus.OK).json({
        message:"this all chef departement ",chefDepartement
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"chef departement  not found"+error.message
    })
   } 
  }






  @Patch(':id')
 async update(@Param('id') id: number, @Body() updateChefDepartementDto: UpdateChefDepartementDto, @Res() response) {
   try {
     const chefDepartement=await this.chefDepartementService.update(id,updateChefDepartementDto)
    return response.status(HttpStatus.OK).json({
        message:" chef departement update avec succsefly",chefDepartement
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"chef departement not found"+error.message
    })
   }
  }






  @Delete(':id')
 async remove(@Param('id') id: number, @Res() response) {
     try {
    const chefDepartement=await this.chefDepartementService.remove(id)
    return response.status(HttpStatus.OK).json({
        message:" chef departement remove avec succsefly",chefDepartement
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"chef departement not found"+error.message
    })
   }
  }
}