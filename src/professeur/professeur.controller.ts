import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { ProfesseurService } from './professeur.service';
import { CreateProfesseurDto } from './dto/create-professeur.dto';
import { UpdateProfesseurDto } from './dto/update-professeur.dto';

@Controller('professeur')
export class ProfesseurController {
  constructor(private readonly professeurService: ProfesseurService) {}




  @Post()
 async create(@Body() createProfesseurDto: CreateProfesseurDto,@Res() response) {
 try {
         const newprofesseur=await this.professeurService.create(createProfesseurDto)
         return response.status(HttpStatus.CREATED).json({
           message:"professeur create avec succes",newprofesseur
         })
       } catch (error) {
        const status = error instanceof NotFoundException ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST;
        return response.status(status).json({
          statusCode: status,
          message: error.message || 'Erreur lors de la création du professeur'
        });
      }
    }






  @Get()
 async findAll(@Res() response) {
  try {
      const professeur=await this.professeurService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all professeur ",professeur
      })
      
    } catch (error) {
      const status = error instanceof NotFoundException ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST;
      return response.status(status).json({
        statusCode: status,
        message: error.message || 'Erreur lors de la récupération des professeurs'
      });
    }
  }





  @Get(':id')
 async findOne(@Param('id', ParseIntPipe) id: number, @Res() response) {
 try {
    const professeur=await this.professeurService.findOne(id)
    return response.status(HttpStatus.OK).json({
        message:"this all professeur ",professeur
      })
    
   } catch (error) {
    const status = error instanceof NotFoundException ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST;
    return response.status(status).json({
      statusCode: status,
      message: error.message || 'Professeur non trouvé'
    });
  }
}





  @Patch(':id')
 async update(@Param('id', ParseIntPipe) id: number, @Body() updateProfesseurDto: UpdateProfesseurDto, @Res() response) {
  try {
    const professeur=await this.professeurService.update(id,updateProfesseurDto)
    return response.status(HttpStatus.OK).json({
        message:" professeur update avec succsefly",professeur
      })
    
   } catch (error) {
    const status = error instanceof NotFoundException ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST;
    return response.status(status).json({
      statusCode: status,
      message: error.message || 'Professeur non trouvé'
    });
  }
}





  @Delete(':id')
 async remove(@Param('id', ParseIntPipe) id: number, @Res() response) {
     try {
    const professeur=await this.professeurService.remove(id)
    return response.status(HttpStatus.OK).json({
        message:" professeur remove avec succsefly",professeur
      })
    
   } catch (error) {
    const status = error instanceof NotFoundException ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST;
    return response.status(status).json({
      statusCode: status,
      message: error.message || 'Professeur non trouvé'
    });
  }
}
}
