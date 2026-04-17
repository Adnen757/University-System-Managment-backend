import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { DepartementService } from './departement.service';
import { CreateDepartementDto } from './dto/create-departement.dto';
import { UpdateDepartementDto } from './dto/update-departement.dto';
import { response } from 'express';

@Controller('departement')
export class DepartementController {
  constructor(private readonly departementService: DepartementService) {}



  @Post()
  async create(@Body() createDepartementDto: CreateDepartementDto ,@Res() response) {
    try {
         const newdepartement=await this.departementService.create(createDepartementDto)
         return response.status(HttpStatus.CREATED).json({
           message:"departement create avec succes",newdepartement
         })
       } catch (error) {
        return response.status(HttpStatus.BAD_REQUEST).json({
   statusCode : 400,
   message :"error lors de la creation de departement "+error.message
       })}



  }





  @Get()
  async findAll(@Res() response) {
   try {
      const departement=await this.departementService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all departement ",departement
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
    const departement=await this.departementService.findOne(id)
    return response.status(HttpStatus.OK).json({
        message:"this all departement ",departement
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"departement not found"+error.message
    })
   }
  }












  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateDepartementDto: UpdateDepartementDto,@Res() response) {
     try {
    const departement=await this.departementService.update(id,updateDepartementDto)
    return response.status(HttpStatus.OK).json({
        message:" departement de id "+id+" update avec succsefly",departement
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"departement de id "+id+" not found "+error.message
    })
   }
  }



  @Delete(':id')
  async remove(@Param('id') id: number,@Res() response) {
    try {
    const departement=await this.departementService.remove(id)
    return response.status(HttpStatus.OK).json({
        message:" departement de id "+id+" remove avec succsefly",departement
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"departement de id "+id+" not found "+error.message
    })
   }
  }
}
