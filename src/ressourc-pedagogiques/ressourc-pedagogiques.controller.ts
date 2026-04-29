import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseInterceptors, ParseIntPipe, UploadedFile } from '@nestjs/common';
import { RessourcPedagogiquesService } from './ressourc-pedagogiques.service';
import { CreateRessourcPedagogiqueDto } from './dto/create-ressourc-pedagogique.dto';
import { UpdateRessourcPedagogiqueDto } from './dto/update-ressourc-pedagogique.dto';
import { response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('ressourc-pedagogiques')
export class RessourcPedagogiquesController {
  constructor(private readonly ressourcPedagogiquesService: RessourcPedagogiquesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './stockage',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  async create(
    @Body() createRessourcPedagogiqueDto: any,
    @Res() response,
    @UploadedFile() file: Express.Multer.File
  ) {
    try {
      // Convert string values from FormData back to correct types
      const dto: CreateRessourcPedagogiqueDto = {
        ...createRessourcPedagogiqueDto,
        version: createRessourcPedagogiqueDto.version ? parseInt(createRessourcPedagogiqueDto.version) : 1,
        visible: createRessourcPedagogiqueDto.visible === 'true' || createRessourcPedagogiqueDto.visible === true,
        matiereId: parseInt(createRessourcPedagogiqueDto.matiereId),
        classeId: createRessourcPedagogiqueDto.classeId ? parseInt(createRessourcPedagogiqueDto.classeId) : undefined,
      };

      if (file) {
        dto.lien = `/stockage/${file.filename}`;
      }

      const newresourse = await this.ressourcPedagogiquesService.create(dto)
      return response.status(HttpStatus.CREATED).json({
        message: "ressource create avec succes", newresourse
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: "error lors de la creation de ressource " + error.message
      })
    }
  }






  @Get()
  async findAll(@Res() response) {
    try {
      const ressource = await this.ressourcPedagogiquesService.findAll()
      return response.status(HttpStatus.OK).json({
        message: "this all ressource ",
        data: ressource
      })

    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: "error data not found" + error.message
      })
    }
  }

  @Get('professeur/:proprietaire')
  async findByProfesseur(@Param('proprietaire') proprietaire: string, @Res() response) {
    try {
      const ressource = await this.ressourcPedagogiquesService.findByProfesseur(proprietaire)
      return response.status(HttpStatus.OK).json({
        message: "professeur ressources",
        data: ressource
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: "error" + error.message
      })
    }
  }

  @Get('matiere/:matiereId')
  async findByMatiere(@Param('matiereId', ParseIntPipe) matiereId: number, @Res() response) {
    try {
      const ressource = await this.ressourcPedagogiquesService.findByMatiere(matiereId)
      return response.status(HttpStatus.OK).json({
        message: "matiere ressources",
        data: ressource
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: "error" + error.message
      })
    }
  }

  @Get('classe/:classeId')
  async findByClasse(@Param('classeId', ParseIntPipe) classeId: number, @Res() response) {
    try {
      const ressource = await this.ressourcPedagogiquesService.findByClasse(classeId)
      return response.status(HttpStatus.OK).json({
        message: "classe ressources",
        data: ressource
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: "error" + error.message
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
