import { Controller, Get, Param } from '@nestjs/common';
import { FindingsService } from './findings.service';

@Controller('findings')
export class FindingsController {
  constructor(private readonly findingsService: FindingsService) {}

  @Get('normal/:id')
  getNormalFindingById(@Param('id') id: number) {
    return this.findingsService.getNormalFindingById(Number(id));
  }

  @Get('abnormal/:id')
  getAbormalFindingById(@Param('id') id: number) {
    return this.findingsService.getAbormalFindingById(Number(id));
  }
}
