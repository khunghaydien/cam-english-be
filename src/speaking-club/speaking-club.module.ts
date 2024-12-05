import { Module } from '@nestjs/common';
import { SpeakingClubResolver } from './speaking-club.resolver';
import { SpeakingClubService } from './speaking-club.service';
import { PrismaService } from 'src/prisma.service';
import { PubsubService } from 'src/common/services/pubsub.service';
import { SpeakingClubGateway } from './speaking-club.gateway';

@Module({
  providers: [SpeakingClubResolver, SpeakingClubService, PrismaService, PubsubService, SpeakingClubGateway]
})
export class SpeakingClubModule { }
