import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class GetSpeakingRoomDto {
    @Field(() => String)
    @IsNotEmpty({ message: "Id is required" })
    @IsString({ message: 'Id must be string' })
    id: string
}