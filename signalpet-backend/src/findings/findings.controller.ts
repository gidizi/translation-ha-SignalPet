import { Controller, Get, Param, Query } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { FindingsService } from './findings.service';

@Controller('findings')
export class FindingsController {
  constructor(private readonly findingsService: FindingsService) {}

  @Get('normal/:id')
  async getNormalFindingById(
    @Param('id') id: number,
    @Query('lang') lang?: string,
  ) {
    try {
      return await this.findingsService.getNormalFindingById(Number(id), lang);
    } catch (error) {
      console.error('Error fetching normal finding:', error.message);
      throw new HttpException(
        'Failed to fetch normal finding. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('abnormal/:id')
  async getAbnormalFindingById(
    @Param('id') id: number,
    @Query('lang') lang?: string,
  ) {
    try {
      return await this.findingsService.getAbnormalFindingById(
        Number(id),
        lang,
      );
    } catch (error) {
      console.error('Error fetching abnormal finding:', error.message);
      throw new HttpException(
        'Failed to fetch abnormal finding. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
