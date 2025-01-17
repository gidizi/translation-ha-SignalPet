import {
  Controller,
  Get,
  Query,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AnalysisSummaryService } from './analysis_summary.service';

@Controller('analysis-summary')
export class AnalysisSummaryController {
  constructor(
    private readonly analysisSummaryService: AnalysisSummaryService,
  ) {}

  @Get(':id')
  async getAnalysisSummary(
    @Param('id') id: number,
    @Query('lang') lang?: string,
  ) {
    try {
      return await this.analysisSummaryService.getAnalysisSummaryById(
        Number(id),
        lang,
      );
    } catch (error) {
      console.error('Error fetching summary:', error.message);
      throw new HttpException(
        'Failed to fetch summary. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
