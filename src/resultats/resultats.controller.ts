import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ResultatService } from './resultats.service';

@Controller('resultat')
export class ResultatController {
  constructor(private readonly resultatService: ResultatService) {}

  @Post('bulk')
  saveBulk(@Body() resultats: any[]) {
    return this.resultatService.saveBulk(resultats);
  }

  @Get()
  findAll(@Query('departementId') departementId: string) {
    return this.resultatService.findAll(departementId ? +departementId : undefined);
  }
}
