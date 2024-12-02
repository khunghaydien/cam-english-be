import { Field, InputType } from "@nestjs/graphql";
import { Language, Level, SpeakingRoomType } from "@prisma/client";
import { IsArray, IsEnum, IsOptional, IsString } from "class-validator";

@InputType()
export class FilterSpeakingClubDto {
    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: 'Name must be string' })
    name: string

    @Field(() => [String], { nullable: true })
    @IsOptional()
    @IsArray()
    @IsEnum(Level, { each: true, message: 'Each level must be a valid Level enum value' })
    level?: Level[];

    @Field(() => [String], { nullable: true })
    @IsOptional()
    @IsArray()
    @IsEnum(Language, { each: true, message: 'Each language must be a valid Level enum value' })
    language?: Language[];

    @Field(() => [String], { nullable: true })
    @IsOptional()
    @IsArray()
    @IsEnum(SpeakingRoomType, { each: true, message: 'Each type must be a valid Level enum value' })
    type?: SpeakingRoomType[];

}