import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ChannelService } from './channel.service';
import { Channel, Channels } from './channel.response';
import { CreateChannelDto, FilterChannelDto } from './channel.dto';
import { Request, Response } from 'express';
import { OrderByDto, PaginationDto } from 'src/app.dto';

@Resolver()
export class ChannelResolver {
    constructor(
        private readonly channelService: ChannelService
    ) { }

    @Mutation(() => Channel, { nullable: true })
    async createChannel(
        @Args('createChannelDto') createChannelDto: CreateChannelDto,
        @Context() context: { req: Request, res: Response }
    ): Promise<Channel> {
        return await this.channelService.createChannel(createChannelDto, context.req)
    }

    @Query(() => Channels, { nullable: true })
    async getChannel(
        @Args('filterChannelDto', { nullable: true }) filterChannelDto: FilterChannelDto,
        @Args('paginationDto', { nullable: true }) paginationDto: PaginationDto,
        @Args('orderByDto', { nullable: true }) orderByDto: OrderByDto
    ): Promise<Channels> {
        return await this.channelService.getChannel(filterChannelDto, paginationDto, orderByDto)
    }
}
