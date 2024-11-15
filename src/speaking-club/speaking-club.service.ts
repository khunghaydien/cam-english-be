import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateChannelDto, FilterSpeakingClubDto, GetChannelDto } from '../speaking-club/speaking-club.dto';
import { Channel, SpeakingClub } from '../speaking-club/speaking-club.response';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { OrderByDto, PaginationDto } from 'src/app.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class SpeakingClubService {
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

    async getChannel({ id }: GetChannelDto): Promise<Channel> {
        try {
            return await this.prismaService.channel.findUnique({
                where: {
                    id
                },
                include: {
                    host: true
                }
            })
        } catch (error) {
            throw new BadRequestException({ channel: 'An error occurred while getting channel.' })
        }
    }

    async getSpeakingClub(
        { name, type, level, language }: FilterSpeakingClubDto,
        { page, pageSize }: PaginationDto,
        { field, order }: OrderByDto): Promise<SpeakingClub> {
        const where: Prisma.ChannelWhereInput = {
            ...(name && { name: { contains: name, mode: 'insensitive' } }),
            ...(type && { type }),
            ...(level && { level }),
            ...(language && { language }),
        }
        const orderBy: Prisma.ChannelOrderByWithRelationInput = {
            [field]: order
        }
        const skip = (page - 1) * pageSize;
        const take = pageSize;
        try {
            const [totalElements, speakingClub] = await Promise.all([
                this.prismaService.channel.count({ where }),
                this.prismaService.channel.findMany({
                    where,
                    skip,
                    take,
                    orderBy,
                }),
            ]);

            return {
                data: speakingClub,
                pagination: {
                    currentPage: page,
                    pageSize: pageSize,
                    totalElements,
                    totalPages: Math.ceil(totalElements / pageSize),
                },
            };
        } catch (error) {
            throw new BadRequestException({ channel: 'An error occurred while getting speaking club.' })
        }
    }
}
