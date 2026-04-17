import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { response } from 'express';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
 async create(@Body() createNoteDto: CreateNoteDto ,@Res() response) {
              try {
                 const newnote=await this.noteService.create(createNoteDto)
                 return response.status(HttpStatus.CREATED).json({
                   message:"note create avec succes",newnote
                 })
               } catch (error) {
                return response.status(HttpStatus.BAD_REQUEST).json({
           statusCode : 400,
           message :"error lors de la creation de  note"+error.message
               })
          }
  }







  @Get()
 async findAll(@Res() response) {
      try {
      const note=await this.noteService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all note",note
      })
      
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"error data not found"+error.message
    })
    }
  }




  @Get(':id')
 async findOne(@Param('id') id: number ,@Res() response) {
         try {
    const note=await this.noteService.findOne(id)
    return response.status(HttpStatus.OK).json({
        message:"this all note",note
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"note not found"+error.message
    })
   }
  }





  @Patch(':id')
 async update(@Param('id') id: number, @Body() updateNoteDto: UpdateNoteDto ,@Res() response) {
    try {
    const note=await this.noteService.update(id,updateNoteDto)
    return response.status(HttpStatus.OK).json({
        message:" note update avec succsefly",note
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"note not found"+error.message
    })
   }
  }




  @Delete(':id')
async  remove(@Param('id') id: number ,@Res() response) {
        try {
    const note=await this.noteService.remove(id)
    return response.status(HttpStatus.OK).json({
        message:" note remove avec succsefly",note
      })
    
   } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
statusCode : 400,
message :"note not found"+error.message
    })
   }
  }
}
