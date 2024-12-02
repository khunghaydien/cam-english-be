import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SpeakingClubService } from './speaking-club.service';
import { OrderByDto, PaginationDto } from 'src/common/dto';
import { Request, Response } from 'express';
import { SpeakingClub, SpeakingRoom } from './entities';
import { CreateSpeakingRoomDto, FilterSpeakingClubDto, GetSpeakingRoomDto } from './dto';

@Resolver()
export class SpeakingClubResolver {
    constructor(
        private readonly SpeakingClubService: SpeakingClubService
    ) { }

    @Mutation(() => SpeakingRoom, { nullable: true })
    async createSpeakingRoom(
        @Args('createSpeakingRoomDto') createSpeakingRoomDto: CreateSpeakingRoomDto,
        @Context() context: { req: Request, res: Response }
    ): Promise<SpeakingRoom> {
        return await this.SpeakingClubService.createSpeakingRoom(createSpeakingRoomDto, context.req)
    }

    @Query(() => SpeakingClub, { nullable: true })
    async getSpeakingClub(
        @Args('filterSpeakingClubDto', { nullable: true }) filterSpeakingClubDto: FilterSpeakingClubDto,
        @Args('paginationDto', { nullable: true }) paginationDto: PaginationDto,
        @Args('orderByDto', { nullable: true }) orderByDto: OrderByDto
    ): Promise<SpeakingClub> {
        return await this.SpeakingClubService.getSpeakingClub(filterSpeakingClubDto, paginationDto, orderByDto)
    }

    @Query(() => SpeakingRoom, { nullable: true })
    async getSpeakingRoom(@Args('getSpeakingRoomDto', { nullable: true }) getSpeakingRoomDto: GetSpeakingRoomDto): Promise<SpeakingRoom> {
        return this.SpeakingClubService.getSpeakingRoom(getSpeakingRoomDto)
    }
}
