import { Test, TestingModule } from '@nestjs/testing';
import { FindingsController } from './findings.controller';
import { FindingsService } from './findings.service';

describe('FindingsController', () => {
  let controller: FindingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindingsController],
      providers: [FindingsService],
    }).compile();

    controller = module.get<FindingsController>(FindingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
