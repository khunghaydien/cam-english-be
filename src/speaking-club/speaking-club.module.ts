import { Module } from '@nestjs/common';
import { SpeakingClubResolver } from './speaking-club.resolver';
import { SpeakingClubService } from './speaking-club.service';
import { PrismaService } from 'src/prisma.service';
import { PubsubService } from 'src/common/services/pubsub.service';

@Module({
  providers: [SpeakingClubResolver, SpeakingClubService, PrismaService, PubsubService]
})
export class SpeakingClubModule { }
