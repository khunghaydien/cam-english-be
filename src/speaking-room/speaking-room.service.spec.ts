import { Test, TestingModule } from '@nestjs/testing';
import { SpeakingRoomService } from './speaking-room.service';

describe('SpeakingRoomService', () => {
  let service: SpeakingRoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpeakingRoomService],
    }).compile();

    service = module.get<SpeakingRoomService>(SpeakingRoomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
