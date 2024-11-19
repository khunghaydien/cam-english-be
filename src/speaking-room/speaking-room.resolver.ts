import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SpeakingRoomService } from './speaking-room.service';
import { ListSpeakingRoom, SpeakingRoom } from './entities';
import { CreateSpeakingRoomDto, FilterSpeakingRoomDto, GetSpeakingRoomDto } from './dto';
import { OrderByDto, PaginationDto } from 'src/common/dto';
import { Request, Response } from 'express';

@Resolver()
export class SpeakingRoomResolver {
    constructor(
        private readonly speakingRoomService: SpeakingRoomService
    ) { }

    @Mutation(() => SpeakingRoom, { nullable: true })
    async createSpeakingRoom(
        @Args('createSpeakingRoomDto') createSpeakingRoomDto: CreateSpeakingRoomDto,
        @Context() context: { req: Request, res: Response }
    ): Promise<SpeakingRoom> {
        return await this.speakingRoomService.createSpeakingRoom(createSpeakingRoomDto, context.req)
    }

    @Query(() => ListSpeakingRoom, { nullable: true })
    async getListSpeakingRoom(
        @Args('filterSpeakingRoomDto', { nullable: true }) filterSpeakingRoomDto: FilterSpeakingRoomDto,
        @Args('paginationDto', { nullable: true }) paginationDto: PaginationDto,
        @Args('orderByDto', { nullable: true }) orderByDto: OrderByDto
    ): Promise<ListSpeakingRoom> {
        return await this.speakingRoomService.getListSpeakingRoom(filterSpeakingRoomDto, paginationDto, orderByDto)
    }

    @Query(() => SpeakingRoom, { nullable: true })
    async getSpeakingRoom(@Args('getSpeakingRoomDto', { nullable: true }) getSpeakingRoomDto: GetSpeakingRoomDto): Promise<SpeakingRoom> {
        return this.speakingRoomService.getSpeakingRoom(getSpeakingRoomDto)
    }
}
