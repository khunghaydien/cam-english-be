import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelResolver } from './channel.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ChannelService, ChannelResolver, PrismaService]
})
export class ChannelModule { }
