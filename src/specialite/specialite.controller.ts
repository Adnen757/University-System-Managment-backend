import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { SpecialiteService } from './specialite.service';
import { CreateSpecialiteDto } from './dto/create-specialite.dto';
import { UpdateSpecialiteDto } from './dto/update-specialite.dto';

@Controller('specialite')
export class SpecialiteController {
  constructor(private readonly specialiteService: SpecialiteService) {}

  @Post()
 async create(@Body() createSpecialiteDto: CreateSpecialiteDto ,@Res() response) {
 try {
          const newspecialite=await this.specialiteService.create(createSpecialiteDto)
          return response.status(HttpStatus.CREATED).json({
            message:"specialite create avec succes",newspecialite
          })
        } catch (error) {
         return response.status(HttpStatus.BAD_REQUEST).json({
    statusCode : 400,
    message :"error lors de la creation de specialite "+error.message
        })} 
  }

  @Get()
   async findAll(@Res() response) {
  try {
      const specialite=await this.specialiteService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all specialite ",specialite
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
    const specialite=await this.specialiteService.findOne(id)
    return response.status(HttpStatus.OK).json({
        message:"this all specialite ",specialite
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"specialite  not found"+error.message
    })
   }  }



  @Patch(':id')
  async update(@Param('id') id: number, @Body() UpdateSpecialiteDto: UpdateSpecialiteDto ,@Res() response) {
   try {
     const specialite=await this.specialiteService.update(id,UpdateSpecialiteDto)
     return response.status(HttpStatus.OK).json({
         message:" specialite update avec succsefly",specialite
       })
     
    } catch (error) {
     return response.status(HttpStatus.BAD_REQUEST).json({
 statusCode : 400,
 message :"specialite not found"+error.message
     })
    }  }




  @Delete(':id')
  async  remove(@Param('id') id: number ,@Res() response) {
     try {
    const specialite=await this.specialiteService.remove(id)
    return response.status(HttpStatus.OK).json({
        message:" specialite remove avec succsefly",specialite
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"specialite not found"+error.message
    })
   }
  }
}
