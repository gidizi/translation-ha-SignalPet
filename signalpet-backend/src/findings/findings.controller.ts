import { Controller, Get, Param, Query } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { FindingsService } from './findings.service';

@Controller('findings')
export class FindingsController {
  constructor(private readonly findingsService: FindingsService) {}

  //todo: extract shared logic of normal/abnormal controllers
  @Get('normal/:id')
  async getNormalFindingById(
    @Param('id') id: number,
    @Query('lang') lang?: string,
  ) {
    try {
      return await this.findingsService.getNormalFindingById(Number(id), lang);
    } catch (error) {
      console.error('Error fetching normal finding:', error.message);
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data?.error?.includes('is not supported')
      ) {
        throw new HttpException(
          `The requested language is not supported.`,
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Failed to fetch normal finding. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //todo: extract extacting shared logic of normal/abnormal controllers
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
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data?.error?.includes('is not supported')
      ) {
        throw new HttpException(
          `The requested language is not supported.`,
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Failed to fetch abnormal finding. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
