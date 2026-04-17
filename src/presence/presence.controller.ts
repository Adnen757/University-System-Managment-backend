import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { PresenceService } from './presence.service';
import { CreatePresenceDto } from './dto/create-presence.dto';
import { UpdatePresenceDto } from './dto/update-presence.dto';

@Controller('presence')
export class PresenceController {
  constructor(private readonly presenceService: PresenceService) {}



  @Post()
 async create(@Body() createPresenceDto: CreatePresenceDto ,@Res()response) {
          try {
                  const newpresence=await this.presenceService.create(createPresenceDto)
                  return response.status(HttpStatus.CREATED).json({
                    message:"presence create avec succes",newpresence
                  })
                } catch (error) {
                 return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode : 400,
            message :"error lors de la creation de  presence"+error.message
                })
           }
  }






  @Get()
 async findAll(@Res()response) {
        try {
      const presence=await this.presenceService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all presence",presence
      })
      
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"error data not found"+error.message
    })
    }
  }










  @Get(':id')
 async findOne(@Param('id') id: number,@Res()response) {
           try {
    const presence=await this.presenceService.findOne(id)
    return response.status(HttpStatus.OK).json({
        message:"this all presence",presence
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"presence de id "+id+" not found "+error.message
    })
   }
  }







  @Patch(':id')
 async update(@Param('id') id: number, @Body() updatePresenceDto: UpdatePresenceDto,@Res()response) {
       try {
    const presence=await this.presenceService.update(id,updatePresenceDto)
    return response.status(HttpStatus.OK).json({
        message:" presence update avec succsefly",presence
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"presence de id "+id+" not found "+error.message
    })
   }
  }







  @Delete(':id')
 async remove(@Param('id') id: number,@Res()response) {
         try {
    const presence=await this.presenceService.remove(id)
    return response.status(HttpStatus.OK).json({
        message:" presence  remove avec succsefly",presence
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"presence de id "+id+" not found "+error.message
    })
   }
  }
}
