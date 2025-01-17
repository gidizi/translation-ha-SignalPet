import { Injectable } from '@nestjs/common';
import { TranslationService } from 'src/translation/translation.service';
import { generateXrayAnalysisSummary } from 'src/utils/strings';

@Injectable()
export class AnalysisSummaryService {
  constructor(private readonly translationService: TranslationService) {}

  async getAnalysisSummaryById(
    id: number,
    lang: string = 'en',
  ): Promise<string[]> {
    //note: id will be used in an actual app when data isn't randomly generate
    try {
      const summary = generateXrayAnalysisSummary();
      return await this.translationService.batchTranslate(summary, 'en', lang);
    } catch (error) {
      console.error('Error in getNormalFindingById:', error.message);
      throw error;
    }
  }
}
