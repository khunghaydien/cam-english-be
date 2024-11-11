import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { ChannelService } from './channel.service';
import { Channel } from './channel.response';
import { CreateChannelDto } from './channel.dto';
import { Request, Response } from 'express';

@Resolver()
export class ChannelResolver {
    constructor(
        private readonly channelService: ChannelService
    ) { }

    @Mutation(() => Channel, { nullable: true })
    async createChannel(
        @Args('createChannelDto') createChannelDto: CreateChannelDto,
        @Context() { request, response }: { request: Request, response: Response }
    ) {
        return this.channelService.createChannel(createChannelDto, request, response)
    }
}
