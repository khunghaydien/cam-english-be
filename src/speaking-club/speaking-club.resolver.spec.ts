import { Test, TestingModule } from '@nestjs/testing';
import { SpeakingClubResolver } from './speaking-club.resolver';

describe('SpeakingClubResolver', () => {
  let resolver: SpeakingClubResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpeakingClubResolver],
    }).compile();

    resolver = module.get<SpeakingClubResolver>(SpeakingClubResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
