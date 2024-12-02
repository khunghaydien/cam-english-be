import { Test, TestingModule } from '@nestjs/testing';
import { SpeakingClubService } from './speaking-club.service';

describe('SpeakingClubService', () => {
  let service: SpeakingClubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpeakingClubService],
    }).compile();

    service = module.get<SpeakingClubService>(SpeakingClubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
