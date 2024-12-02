import { Field, ObjectType } from "@nestjs/graphql";
import { Pagination } from "src/common/entities";
import { SpeakingRoom } from "./speaking-room.entity";

@ObjectType()
export class SpeakingClub {
    @Field(() => [SpeakingRoom])
    data: SpeakingRoom[];

    @Field(() => Pagination)
    pagination: Pagination;
}