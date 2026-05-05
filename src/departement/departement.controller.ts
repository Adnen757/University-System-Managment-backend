import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { DepartementService } from './departement.service';
import { CreateDepartementDto } from './dto/create-departement.dto';
import { UpdateDepartementDto } from './dto/update-departement.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@Controller('departement')
export class DepartementController {
  constructor(private readonly departementService: DepartementService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  async create(@Body() createDepartementDto: CreateDepartementDto) {
    const newdepartement = await this.departementService.create(createDepartementDto);
    return {
      message: "departement créé avec succès",
      data: newdepartement,
    };
  }

  @Get()
  async findAll() {
    const departement = await this.departementService.findAll();
    return {
      message: "liste des départements",
      data: departement,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const departement = await this.departementService.findOne(+id);
    return {
      message: "département trouvé",
      data: departement,
    };
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  async update(@Param('id') id: number, @Body() updateDepartementDto: UpdateDepartementDto) {
    const departement = await this.departementService.update(+id, updateDepartementDto);
    return {
      message: "département mis à jour",
      data: departement,
    };
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  async remove(@Param('id') id: number) {
    await this.departementService.remove(+id);
    return {
      message: "département supprimé",
    };
  }
}

