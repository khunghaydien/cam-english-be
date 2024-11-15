import { Module } from '@nestjs/common';
import { SpeakingClubResolver } from './speaking-club.resolver';
import { SpeakingClubService } from './speaking-club.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [SpeakingClubResolver, SpeakingClubService, PrismaService]
})
export class SpeakingClubModule { }
