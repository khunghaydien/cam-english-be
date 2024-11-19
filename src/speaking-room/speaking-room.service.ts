import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { Prisma } from '@prisma/client';
import { OrderByDto, PaginationDto } from 'src/common/dto';
import { ListSpeakingRoom, SpeakingRoom } from './entities';
import { CreateSpeakingRoomDto, FilterSpeakingRoomDto, GetSpeakingRoomDto } from './dto';

@Injectable()
export class SpeakingRoomService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly userService: UserService
    ) { }

    async createSpeakingRoom({ name, language, type, level }: CreateSpeakingRoomDto, req: Request): Promise<SpeakingRoom> {
        const user = await this.userService.verifyUser(req)
        if (!user) {
            throw new BadRequestException({ user: 'User no longer exists' });
        }
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
            throw new BadRequestException({ speakingRoom: 'An error occurred while creating Speaking Room.' });
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

    async getListSpeakingRoom(
        { name, type, level, language }: FilterSpeakingRoomDto,
        { page, pageSize }: PaginationDto,
        { field, order }: OrderByDto): Promise<ListSpeakingRoom> {
        const where: Prisma.SpeakingRoomWhereInput = {
            ...(name && { name: { contains: name, mode: 'insensitive' } }),
            ...(type && { type }),
            ...(level && { level }),
            ...(language && { language }),
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
