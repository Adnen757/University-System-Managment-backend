import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';

@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post()
  async create(@Body() createEvaluationDto: CreateEvaluationDto,@Res() response) {
   try {
            const newEvaluation=await this.evaluationService.create(createEvaluationDto)
            return response.status(HttpStatus.CREATED).json({
              message:"evaluation create avec succes",newEvaluation 
            })
          } catch (error) {
           return response.status(HttpStatus.BAD_REQUEST).json({
      statusCode : 400,
      message :"error lors de la creation de evaluation "+error.message
          })} 
    }



  @Get()
  async findAll(@Res() response) {
  try {
      const evaluation=await this.evaluationService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all evaluation ",evaluation
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
    const evaluation=await this.evaluationService.findOne(id)
    return response.status(HttpStatus.OK).json({
        message:"this evaluation ",evaluation
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"notification  not found"+error.message
    })
   }  }

    @Patch(':id')
     async update(@Param('id') id: number, @Body() UpdateEvaluationDto: UpdateEvaluationDto ,@Res() response) {
      try {
        const evaluation=await this.evaluationService.update(id,UpdateEvaluationDto)
        return response.status(HttpStatus.OK).json({
            message:" evaluation update avec succsefly",evaluation
          })
        
       } catch (error) {
        return response.status(HttpStatus.BAD_REQUEST).json({
    statusCode : 400,
    message :"evaluation not found"+error.message
        })
       }  }



  
   @Delete(':id')
  async  remove(@Param('id') id: number ,@Res() response) {
     try {
    const evaluation=await this.evaluationService.remove(id)
    return response.status(HttpStatus.OK).json({
        message:" evaluation remove avec succsefly",evaluation
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"evaluation not found"+error.message
    })
   }
  }
}
