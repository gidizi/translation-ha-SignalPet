import { Module } from '@nestjs/common';
import { AnalysisSummaryService } from './analysis_summary.service';
import { AnalysisSummaryController } from './analysis_summary.controller';
import { TranslationModule } from '../translation/translation.module';

@Module({
  imports: [TranslationModule],
  controllers: [AnalysisSummaryController],
  providers: [AnalysisSummaryService],
})
export class AnalysisSummaryModule {}
