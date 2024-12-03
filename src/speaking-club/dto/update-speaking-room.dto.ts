import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import GraphQLJSON from 'graphql-type-json';
@InputType()
export class UpdateSpeakingRoomDto {
    @Field(() => String)
    @IsNotEmpty({ message: "Id is required" })
    id: string

    @Field(() => GraphQLJSON, { nullable: true })
    @IsNotEmpty({ message: "Offer is required" })
    offer?: any;
}
