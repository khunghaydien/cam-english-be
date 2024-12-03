import { Args, Context, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { SpeakingClubService } from './speaking-club.service';
import { OrderByDto, PaginationDto } from 'src/common/dto';
import { Request, Response } from 'express';
import { SpeakingClub, SpeakingRoom } from './entities';
import { CreateSpeakingRoomDto, FilterSpeakingClubDto, GetSpeakingRoomDto, UpdateSpeakingRoomDto } from './dto';
import { PubsubService } from 'src/common/services/pubsub.service';
@Resolver()
export class SpeakingClubResolver {
    constructor(
        private readonly SpeakingClubService: SpeakingClubService,
        private readonly pubSubService: PubsubService
    ) { }

    @Mutation(() => SpeakingRoom, { nullable: true })
    async updateSpeakingRoom(
        @Args('updateSpeakingRoomDto') updateSpeakingRoomDto: UpdateSpeakingRoomDto,
        @Context() context: { req: Request, res: Response }
    ): Promise<SpeakingRoom> {
        const speakingRoom = await this.SpeakingClubService.updateSpeakingRoom(updateSpeakingRoomDto, context.req)
        await this.pubSubService.publish('speakingRoomSubscription', { speakingRoomSubscription: speakingRoom })
        return speakingRoom
    }

    @Mutation(() => SpeakingRoom, { nullable: true })
    async createSpeakingRoom(
        @Args('createSpeakingRoomDto') createSpeakingRoomDto: CreateSpeakingRoomDto,
        @Context() context: { req: Request, res: Response }
    ): Promise<SpeakingRoom> {
        const speakingRoom = await this.SpeakingClubService.createSpeakingRoom(createSpeakingRoomDto, context.req)
        await this.pubSubService.publish('speakingRoomSubscription', { speakingRoomSubscription: speakingRoom })
        return speakingRoom
    }

    @Subscription(() => SpeakingRoom, {
        nullable: true,
        name: 'speakingRoomSubscription',
        filter: (payload, variables) => {
            if (variables.roomId) {
                return payload.speakingRoomSubscription.id === variables.roomId
            }
            return true;
        },
    })
    speakingRoomSubscription(@Args('roomId', { nullable: true }) roomId: string) {
        return this.pubSubService.asyncIterator('speakingRoomSubscription');
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
