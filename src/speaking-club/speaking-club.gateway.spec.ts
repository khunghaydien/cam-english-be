import { Test, TestingModule } from '@nestjs/testing';
import { SpeakingClubGateway } from './speaking-club.gateway';

describe('SpeakingClubGateway', () => {
  let gateway: SpeakingClubGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpeakingClubGateway],
    }).compile();

    gateway = module.get<SpeakingClubGateway>(SpeakingClubGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
