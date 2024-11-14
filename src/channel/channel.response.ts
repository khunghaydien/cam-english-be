import { Field, ObjectType } from "@nestjs/graphql"
import { $Enums } from "@prisma/client"
import { User } from "src/user/user.response"


@ObjectType()
export class Channel {
    @Field()
    id: string

    @Field(() => String, { nullable: true })
    name?: string

    @Field(() => String, { nullable: true })
    level?: $Enums.ELevel

    @Field(() => String, { nullable: true })
    language?: $Enums.ELanguage

    @Field(() => String, { nullable: true })
    type?: $Enums.EChannel

    @Field(() => String, { nullable: true })
    hostId?: string

    @Field(() => User, { nullable: true })
    host?: User;

    @Field(() => [UserChannel], { nullable: true })
    userChannel?: UserChannel[]

    @Field({ nullable: true })
    createdAt?: Date;

    @Field({ nullable: true })
    updatedAt?: Date;
}

@ObjectType()
export class UserChannel {
    @Field()
    id: string

    @Field(() => String, { nullable: true })
    participantId?: string;

    @Field(() => User, { nullable: true })
    participant?: User;

    @Field(() => String, { nullable: true })
    channelId?: string;

    @Field(() => Channel, { nullable: true })
    channel?: Channel;
}
