import { Field, InputType } from "@nestjs/graphql";
import { Language, Level, SpeakingRoomType } from "@prisma/client";
import { IsNotEmpty, IsString } from "class-validator";
@InputType()
export class CreateSpeakingRoomDto {
    @Field(() => String, { nullable: true })
    @IsNotEmpty({ message: "Name is required" })
    @IsString({ message: 'Name must be string' })
    name: string

    @Field(() => String, { nullable: true })
    @IsNotEmpty({ message: "Level is required" })
    @IsString({ message: 'Level must be string' })
    level: Level


    @Field(() => String, { nullable: true })
    @IsNotEmpty({ message: "Language is required" })
    @IsString({ message: 'Language must be string' })
    language: Language


    @Field(() => String, { nullable: true })
    @IsNotEmpty({ message: "Type is required" })
    @IsString({ message: 'Type must be string' })
    type: SpeakingRoomType
}
