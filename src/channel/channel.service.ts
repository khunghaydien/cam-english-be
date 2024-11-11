import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateChannelDto } from './channel.dto';
import { Channel } from './channel.response';
import { Request, Response } from 'express';

@Injectable()
export class ChannelService {
    constructor(
        private readonly prismaService: PrismaService
    ) { }
    async createChannel({ name, language, type, level }: CreateChannelDto, request: Request, response: Response): Promise<Channel> {
        try {
            return this.prismaService.channel.create({
                data: {
                    language,
                    type,
                    name,
                    level,
                    hostId: ''
                }
            })
        } catch (error) {

        }
    }
}
