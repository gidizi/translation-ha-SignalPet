import { Test, TestingModule } from '@nestjs/testing';
import { AnalysisSummaryService } from './analysis_summary.service';

describe('AnalysisSummaryService', () => {
  let service: AnalysisSummaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnalysisSummaryService],
    }).compile();

    service = module.get<AnalysisSummaryService>(AnalysisSummaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
