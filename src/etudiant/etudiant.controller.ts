import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EtudiantService } from './etudiant.service';
import { CreateEtudiantDto } from './dto/create-etudiant.dto';
import { UpdateEtudiantDto } from './dto/update-etudiant.dto';
import { response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import {diskStorage} from "multer"
import { extname } from 'path';
@Controller('etudiant')
export class EtudiantController {
  constructor(private readonly etudiantService: EtudiantService) {}




  @Post()


 async create(@Body() createEtudiantDto: CreateEtudiantDto ,@Res() response ) {
   try {

    





         const newetudiant=await this.etudiantService.create(createEtudiantDto)
         return response.status(HttpStatus.CREATED).json({
           message:"etudiant create avec succes",newetudiant
         })
       } catch (error) {
        return response.status(HttpStatus.BAD_REQUEST).json({
   statusCode : 400,
   message :"error lors de la creation de etudiant "+error.message
       })} 
      
      }








  @Get()
 async findAll(@Res() response) {
  try {
      const etudiant=await this.etudiantService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all etudiant ",etudiant
      })
      
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"error data not found"+error.message
    })
    }  }







  @Get(':id')
 async findOne(@Param('id') id: number ,@Res() response) {
  try {
    const etudiant=await this.etudiantService.findOne(id)
    return response.status(HttpStatus.OK).json({
        message:" etudiant de id "+id+" est : ",etudiant
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"etudiant  not found"+error.message
    })
   }  }





  @Patch(':id')






  async update(@Param('id') id: number, @Body() updateEtudiantDto: UpdateEtudiantDto ,@Res() response ) {
  try {


    const etudiant=await this.etudiantService.update(id,updateEtudiantDto)
    return response.status(HttpStatus.OK).json({
        message:" etudaint update avec succsefly",etudiant
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"etudiant not found"+error.message
    })
   }  }














  @Delete(':id')
async  remove(@Param('id') id: number ,@Res() response) {
     try {
    const etudaint=await this.etudiantService.remove(id)
    return response.status(HttpStatus.OK).json({
        message:" etudiant remove avec succsefly",etudaint
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"etudiant not found"+error.message
    })
   }
  }














  
}
