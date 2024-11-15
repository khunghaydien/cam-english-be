import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Channel, SpeakingClub } from '../speaking-club/speaking-club.response';
import { CreateChannelDto, FilterSpeakingClubDto, GetChannelDto } from '../speaking-club/speaking-club.dto';
import { Request, Response } from 'express';
import { OrderByDto, PaginationDto } from 'src/app.dto';
import { SpeakingClubService } from './speaking-club.service';

@Resolver()
export class SpeakingClubResolver {
    constructor(
        private readonly speakingClubService: SpeakingClubService
    ) { }

    @Mutation(() => Channel, { nullable: true })
    async createChannel(
        @Args('createChannelDto') createChannelDto: CreateChannelDto,
        @Context() context: { req: Request, res: Response }
    ): Promise<Channel> {
        return await this.speakingClubService.createChannel(createChannelDto, context.req)
    }

    @Query(() => SpeakingClub, { nullable: true })
    async getSpeakingClub(
        @Args('filterSpeakingClubDto', { nullable: true }) filterSpeakingClubDto: FilterSpeakingClubDto,
        @Args('paginationDto', { nullable: true }) paginationDto: PaginationDto,
        @Args('orderByDto', { nullable: true }) orderByDto: OrderByDto
    ): Promise<SpeakingClub> {
        return await this.speakingClubService.getSpeakingClub(filterSpeakingClubDto, paginationDto, orderByDto)
    }

    @Query(() => Channel, { nullable: true })
    async getChannel(@Args('getChannelDto', { nullable: true }) getChannelDto: GetChannelDto): Promise<Channel> {
        return this.speakingClubService.getChannel(getChannelDto)
    }
}
