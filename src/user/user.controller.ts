import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { response } from 'express';
import { Code } from 'typeorm';
import { updatePasswordDto } from './dto/updatePassword.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto,@Res()response) {
    try {
      const newuser=await this.userService.create(createUserDto)
      return response.status(HttpStatus.CREATED).json({
        message:"user create avec succes",newuser
      })
    } catch (error) {
     return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"error lors de la creation de l utulisateur"+error.message
    })}
  }

  @Get()
  async findAll(@Res ()response) {
    try {
      const user=await this.userService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all user",user
      })
      
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"error data not found"+error.message
    })
    }


  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Res()response) {
   try {
    const user=await this.userService.findOne(id)
    return response.status(HttpStatus.OK).json({
        message:"this all user",user
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"user not found"+error.message
    })
   }
  }




  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto,@Res()response) {
     try {
    const user=await this.userService.update(id,updateUserDto)
    return response.status(HttpStatus.OK).json({
        message:" user update with succsefly",user
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"user not found"+error.message
    })
   }
  }



  
  @Delete(':id')
  async remove(@Param('id') id: number , @Res()response) {
      try {
    const user=await this.userService.remove(id)
    return response.status(HttpStatus.OK).json({
        message:" user remove avec succsefly",user
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"user not found"+error.message
    })
   }
  }






  @Put('/update-password/:id')
  async updatePassword(@Body()  UpdatPasswordDto : updatePasswordDto, @Res() res, @Param('id') id: number ){
    try {
      const updatedPassword = await this.userService.updatePassword(id, UpdatPasswordDto.oldPassword, UpdatPasswordDto.newPassword) ;
      return res.status(HttpStatus.OK).json({
        success: true,
        message: "password updated"
      }) ;
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success : false,
        message: "password not updated" + error
      })
    }
  }
}
