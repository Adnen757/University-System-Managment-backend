import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { SeanceService } from './seance.service';
import { CreateSeanceDto } from './dto/create-seance.dto';
import { UpdateSeanceDto } from './dto/update-seance.dto';

@Controller('seance')
export class SeanceController {
  constructor(private readonly seanceService: SeanceService) {}




  @Post()
 async create(@Body() createSeanceDto: CreateSeanceDto ,@Res()response) {
            try {
               const newseance=await this.seanceService.create(createSeanceDto)
               return response.status(HttpStatus.CREATED).json({
                 message:"seance create avec succes",newseance
               })
             } catch (error) {
              return response.status(HttpStatus.BAD_REQUEST).json({
         statusCode : 400,
         message :"error lors de la creation de  seance"+error.message
             })
        }
  }










  @Get()
 async findAll(@Res() response) {
          try {
      const seance=await this.seanceService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all seance",seance
      })
      
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"error data not found"+error.message
    })
    }
  }







  @Get(':id')
async  findOne(@Param('id') id: number,@Res() response) {
           try {
    const seance=await this.seanceService.findOne(id)
    return response.status(HttpStatus.OK).json({
        message:"this all seance",seance
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"seance not found"+error.message
    })
   }
  }




  @Patch(':id')
 async update(@Param('id') id: number, @Body() updateSeanceDto: UpdateSeanceDto,@Res() response) {
        try {
    const seance=await this.seanceService.update(id,updateSeanceDto)
    return response.status(HttpStatus.OK).json({
        message:" seance update avec succsefly",seance
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"seance not found"+error.message
    })
   }
  }







  @Delete(':id')
 async remove(@Param('id') id: number,@Res() response) {
         try {
    const seance=await this.seanceService.remove(id)
    return response.status(HttpStatus.OK).json({
        message:" seance remove avec succsefly",seance
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"seance not found"+error.message
    })
   }
  }
}
