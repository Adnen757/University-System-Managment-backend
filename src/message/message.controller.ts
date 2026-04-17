import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
async  create(@Body() createMessageDto: CreateMessageDto, @Res() response) {
       try {
             const newmessage=await this.messageService.create(createMessageDto)
             return response.status(HttpStatus.CREATED).json({
               message:"message create avec succes",newmessage
             })
           } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({
       statusCode : 400,
       message :"error lors de la creation de  message"+error
           })
      }
  }







  
  @Get()
 async findAll(@Res() response) {
   try {
      const message =await this.messageService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all message",data:message
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
    const message=await this.messageService.findOne(id)
    return response.status(HttpStatus.OK).json({
        message:"this all message",data:message
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"message not found"+error.message
    })
   }
  }






  @Patch(':id')
 async update(@Param('id') id: number, @Body() updateMessageDto: UpdateMessageDto, @Res() response) {
    try {
    const message=await this.messageService.update(id,updateMessageDto)
    return response.status(HttpStatus.OK).json({
        message:" message update avec succsefly", data:message
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"message not found"+error.message
    })
   } 
  }






  @Delete(':id')
 async remove(@Param('id') id: number, @Res() response) {
       try {
    const message =await this.messageService.remove(id)
    return response.status(HttpStatus.OK).json({
        message:" message remove avec succsefly",data:message
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"message not found"+error.message
    })
   }
  }
}
