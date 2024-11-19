import { Field, ObjectType } from "@nestjs/graphql";
import { SpeakingRoom } from ".";
import { Pagination } from "src/common/entities";

@ObjectType()
export class ListSpeakingRoom {
    @Field(() => [SpeakingRoom])
    data: SpeakingRoom[];

    @Field(() => Pagination)
    pagination: Pagination;
}