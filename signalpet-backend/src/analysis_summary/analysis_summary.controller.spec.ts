import { Test, TestingModule } from '@nestjs/testing';
import { AnalysisSummaryController } from './analysis_summary.controller';
import { AnalysisSummaryService } from './analysis_summary.service';

describe('AnalysisSummaryController', () => {
  let controller: AnalysisSummaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalysisSummaryController],
      providers: [AnalysisSummaryService],
    }).compile();

    controller = module.get<AnalysisSummaryController>(AnalysisSummaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
