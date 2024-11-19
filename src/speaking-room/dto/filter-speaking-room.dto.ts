import { Field, InputType } from "@nestjs/graphql";
import { Language, Level, SpeakingRoomType } from "@prisma/client";
import { IsOptional, IsString } from "class-validator";

@InputType()
export class FilterSpeakingRoomDto {
    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: 'Name must be string' })
    name: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: 'Level must be string' })
    level: Level


    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: 'Language must be string' })
    language: Language


    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: 'Speaking room type must be string' })
    type: SpeakingRoomType
}