import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { OrderByDto, PaginationDto } from 'src/common/dto';
import { CreateSpeakingRoomDto, FilterSpeakingClubDto, GetSpeakingRoomDto } from './dto';
import { SpeakingClub, SpeakingRoom } from './entities';
import { User } from 'src/user/entities';

@Injectable()
export class SpeakingClubService {
    constructor(
        private readonly prismaService: PrismaService,
    ) { }

    async createSpeakingRoom({ name, language, type, level }: CreateSpeakingRoomDto, user: User): Promise<SpeakingRoom> {
        try {
            return await this.prismaService.speakingRoom.create({
                data: {
                    language,
                    type,
                    name,
                    level,
                    hostId: user.id
                },
                include: {
                    host: true,
                    userSpeakingRooms: false,
                }
            })
        } catch (error) {
            throw new BadRequestException({ SpeakingRoom: 'An error occurred while creating Speaking Room.' });
        }
    }

    async getSpeakingRoom({ id }: GetSpeakingRoomDto): Promise<SpeakingRoom> {
        try {
            return await this.prismaService.speakingRoom.findUnique({
                where: {
                    id
                },
                include: {
                    host: true
                }
            })
        } catch (error) {
            throw new BadRequestException({ speakingRoom: 'An error occurred while getting Speaking Room.' })
        }
    }

    async getSpeakingClub(
        { name, type, level, language }: FilterSpeakingClubDto,
        { page, pageSize }: PaginationDto,
        { field, order }: OrderByDto): Promise<SpeakingClub> {
        const where: Prisma.SpeakingRoomWhereInput = {
            ...(name && { name: { contains: name, mode: 'insensitive' } }),
            ...(type && { type: { in: type } }),
            ...(level && { level: { in: level } }),
            ...(language && { language: { in: language } }),
        }
        const orderBy: Prisma.SpeakingRoomOrderByWithRelationInput = {
            [field]: order
        }
        const skip = (page - 1) * pageSize;
        const take = pageSize;
        try {
            const [totalElements, speakingRoom] = await Promise.all([
                this.prismaService.speakingRoom.count({ where }),
                this.prismaService.speakingRoom.findMany({
                    where,
                    skip,
                    take,
                    orderBy,
                    include: {
                        host: true
                    }
                }),
            ]);

            return {
                data: speakingRoom,
                pagination: {
                    currentPage: page,
                    pageSize: pageSize,
                    totalElements,
                    totalPages: Math.ceil(totalElements / pageSize),
                },
            };
        } catch (error) {
            throw new BadRequestException({ speakingRoom: 'An error occurred while getting speaking club.' })
        }
    }
}
