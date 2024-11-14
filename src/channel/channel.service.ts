import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateChannelDto } from './channel.dto';
import { Channel } from './channel.response';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ChannelService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly userService: UserService
    ) { }
    async createChannel({ name, language, type, level }: CreateChannelDto, req: Request): Promise<Channel> {
        const user = await this.userService.verifyUser(req)
        if (!user) {
            throw new BadRequestException({ user: 'User no longer exists' });
        }
        try {
            return await this.prismaService.channel.create({
                data: {
                    language,
                    type,
                    name,
                    level,
                    hostId: user.id
                },
                include: {
                    host: true,
                    userChannel: false,
                }
            })
        } catch (error) {
            throw new BadRequestException({ channel: 'An error occurred while creating channel.' });
        }
    }
}
