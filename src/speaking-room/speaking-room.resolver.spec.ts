import { Test, TestingModule } from '@nestjs/testing';
import { SpeakingRoomResolver } from './speaking-room.resolver';

describe('SpeakingRoomResolver', () => {
  let resolver: SpeakingRoomResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpeakingRoomResolver],
    }).compile();

    resolver = module.get<SpeakingRoomResolver>(SpeakingRoomResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
