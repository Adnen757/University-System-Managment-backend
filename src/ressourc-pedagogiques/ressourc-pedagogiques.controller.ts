import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseInterceptors } from '@nestjs/common';
import { RessourcPedagogiquesService } from './ressourc-pedagogiques.service';
import { CreateRessourcPedagogiqueDto } from './dto/create-ressourc-pedagogique.dto';
import { UpdateRessourcPedagogiqueDto } from './dto/update-ressourc-pedagogique.dto';
import { response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';

@Controller('ressourc-pedagogiques')
export class RessourcPedagogiquesController {
  constructor(private readonly ressourcPedagogiquesService: RessourcPedagogiquesService) {}

  @Post()





 async create(@Body() createRessourcPedagogiqueDto: CreateRessourcPedagogiqueDto,@Res() response) {
    try {
             const newresourse=await this.ressourcPedagogiquesService.create(createRessourcPedagogiqueDto)
             return response.status(HttpStatus.CREATED).json({
               message:"ressource create avec succes",newresourse
             })
           } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({
       statusCode : 400,
       message :"error lors de la creation de ressource "+error.message
           })} 
  }






  @Get()
 async findAll(@Res() response) {
  try {
      const ressource=await this.ressourcPedagogiquesService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all ressource ",ressource
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
    const ressource=await this.ressourcPedagogiquesService.findOne(id)
    return response.status(HttpStatus.OK).json({
        message:" ressource de id "+id,ressource
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"ressource  not found"+error.message
    })
   } 
  }







  @Patch(':id')
async  update(@Param('id') id: number, @Body() updateRessourcPedagogiqueDto: UpdateRessourcPedagogiqueDto,@Res() response) {
    try {
    const ressource=await this.ressourcPedagogiquesService.update(id,updateRessourcPedagogiqueDto)
    return response.status(HttpStatus.OK).json({
        message:"ressource update avec succsefly",ressource
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"ressource not found"+error.message
    })
   }
  }






  @Delete(':id')
 async remove(@Param('id') id: number,@Res() response) {
      try {
    const ressource=await this.ressourcPedagogiquesService.remove(id)
    return response.status(HttpStatus.OK).json({
        message:" ressource remove avec succsefly",ressource
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"ressource not found"+error.message
    })
   }
  }
}
