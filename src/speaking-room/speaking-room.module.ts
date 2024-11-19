import { Module } from '@nestjs/common';
import { SpeakingRoomResolver } from './speaking-room.resolver';
import { SpeakingRoomService } from './speaking-room.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [SpeakingRoomResolver, SpeakingRoomService, PrismaService]
})
export class SpeakingRoomModule { }
