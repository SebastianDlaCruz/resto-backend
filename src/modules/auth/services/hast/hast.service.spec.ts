import { Test, TestingModule } from '@nestjs/testing';
import { HastService } from './hast.service';

describe('HastService', () => {
  let service: HastService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HastService],
    }).compile();

    service = module.get<HastService>(HastService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
