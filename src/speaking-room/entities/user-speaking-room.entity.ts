import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/entities";
import { SpeakingRoom } from ".";
@ObjectType()
export class UserSpeakingRoom {
    @Field()
    id: string;

    @Field(() => String, { nullable: true })
    participantId?: string;

    @Field(() => User, { nullable: true })
    participant?: User;

    @Field(() => String, { nullable: true })
    speakingRoomId?: string;

    @Field(() => SpeakingRoom, { nullable: true })
    speakingRoom?: SpeakingRoom;
}