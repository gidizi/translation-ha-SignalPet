import { Controller, Get, Param } from '@nestjs/common';
import { FindingsService } from './findings.service';

@Controller('findings')
export class FindingsController {
  constructor(private readonly findingsService: FindingsService) {}

  @Get(':id')
  getFindingById(@Param('id') id: number) {
    return this.findingsService.getFindingById(Number(id));
  }
}
