import { Field, ObjectType } from "@nestjs/graphql";
import { $Enums } from "@prisma/client";
import { User } from "src/user/entities";
import { UserSpeakingRoom } from ".";

@ObjectType()
export class SpeakingRoom {
    @Field()
    id: string;

    @Field(() => String, { nullable: true })
    name?: string;

    @Field(() => String, { nullable: true })
    level?: $Enums.Level;

    @Field(() => String, { nullable: true })
    language?: $Enums.Language;

    @Field(() => String, { nullable: true })
    type?: $Enums.SpeakingRoomType;

    @Field(() => String, { nullable: true })
    hostId?: string;

    @Field(() => User, { nullable: true })
    host?: User;

    @Field(() => [UserSpeakingRoom], { nullable: true })
    userSpeakingRoom?: UserSpeakingRoom[];

    @Field({ nullable: true })
    createdAt?: Date;

    @Field({ nullable: true })
    updatedAt?: Date;
}