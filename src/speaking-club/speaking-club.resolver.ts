import { Args, Context, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { SpeakingClubService } from './speaking-club.service';
import { OrderByDto, PaginationDto } from 'src/common/dto';
import { SpeakingClub, SpeakingRoom } from './entities';
import { CreateSpeakingRoomDto, FilterSpeakingClubDto, GetSpeakingRoomDto } from './dto';
import { PubsubService } from 'src/common/services/pubsub.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/services/auth-guard.service';
import { User } from 'src/user/entities';
import { RolesGuard } from 'src/common/services/roles-guard.service';
@Resolver()
export class SpeakingClubResolver {
    constructor(
        private readonly SpeakingClubService: SpeakingClubService,
        private readonly pubSubService: PubsubService
    ) { }

    @UseGuards(AuthGuard, RolesGuard("ADMIN", "MEMBER"))
    @Mutation(() => SpeakingRoom, { nullable: true })
    async createSpeakingRoom(
        @Args('createSpeakingRoomDto') createSpeakingRoomDto: CreateSpeakingRoomDto,
        @Context() context: { user: User }
    ): Promise<SpeakingRoom> {
        const speakingRoom = await this.SpeakingClubService.createSpeakingRoom(createSpeakingRoomDto, context.user)
        await this.pubSubService.publish('speakingRoomSubscription', { speakingRoomSubscription: speakingRoom })
        return speakingRoom
    }

    @UseGuards(AuthGuard)
    @Subscription(() => SpeakingRoom, {
        nullable: true,
        name: 'speakingRoomSubscription',
        filter: (_payload, _variables) => {
            return true;
        },
    })
    speakingRoomSubscription() {
        return this.pubSubService.asyncIterator('speakingRoomSubscription');
    }

    @UseGuards(AuthGuard)
    @Query(() => SpeakingClub, { nullable: true })
    async getSpeakingClub(
        @Args('filterSpeakingClubDto', { nullable: true }) filterSpeakingClubDto: FilterSpeakingClubDto,
        @Args('paginationDto', { nullable: true }) paginationDto: PaginationDto,
        @Args('orderByDto', { nullable: true }) orderByDto: OrderByDto
    ): Promise<SpeakingClub> {
        return await this.SpeakingClubService.getSpeakingClub(filterSpeakingClubDto, paginationDto, orderByDto)
    }

    @UseGuards(AuthGuard)
    @Query(() => SpeakingRoom, { nullable: true })
    async getSpeakingRoom(@Args('getSpeakingRoomDto', { nullable: true }) getSpeakingRoomDto: GetSpeakingRoomDto): Promise<SpeakingRoom> {
        return this.SpeakingClubService.getSpeakingRoom(getSpeakingRoomDto)
    }
}
