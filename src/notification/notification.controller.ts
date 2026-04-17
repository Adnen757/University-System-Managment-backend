import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { CreateSpecialiteDto } from 'src/specialite/dto/create-specialite.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()

 async create(@Body() createNotificationDto: CreateNotificationDto ,@Res() response) {
  try {
           const newnotification=await this.notificationService.create(createNotificationDto)
           return response.status(HttpStatus.CREATED).json({
             message:"notification create avec succes",newnotification
           })
         } catch (error) {
          return response.status(HttpStatus.BAD_REQUEST).json({
     statusCode : 400,
     message :"error lors de la creation de notification "+error.message
         })} 
   }


   @Get()
   async findAll(@Res() response) {
  try {
      const notification=await this.notificationService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all notification ",notification
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
    const notification=await this.notificationService.findOne(id)
    return response.status(HttpStatus.OK).json({
        message:"this notification ",notification
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"notification  not found"+error.message
    })
   }  }



   @Patch(':id')
    async update(@Param('id') id: number, @Body() UpdateNotificationDto: UpdateNotificationDto ,@Res() response) {
     try {
       const notification=await this.notificationService.update(id,UpdateNotificationDto)
       return response.status(HttpStatus.OK).json({
           message:" notification update avec succsefly",notification
         })
       
      } catch (error) {
       return response.status(HttpStatus.BAD_REQUEST).json({
   statusCode : 400,
   message :"notification not found"+error.message
       })
      }  }


   @Delete(':id')
  async  remove(@Param('id') id: number ,@Res() response) {
     try {
    const notification=await this.notificationService.remove(id)
    return response.status(HttpStatus.OK).json({
        message:" notification remove avec succsefly",notification
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"notification not found"+error.message
    })
   }
  }
}
