import { Field, InputType } from "@nestjs/graphql";
import { EChannel, ELanguage, ELevel } from "@prisma/client";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
@InputType()
export class CreateChannelDto {
    @Field(() => String)
    @IsNotEmpty({ message: "Name is required" })
    @IsString({ message: 'Name must be string' })
    name: string

    @Field(() => String)
    @IsNotEmpty({ message: "Level is required" })
    @IsString({ message: 'Level must be string' })
    level: ELevel


    @Field(() => String)
    @IsNotEmpty({ message: "Language is required" })
    @IsString({ message: 'Language must be string' })
    language: ELanguage


    @Field(() => String)
    @IsNotEmpty({ message: "Type is required" })
    @IsString({ message: 'Type must be string' })
    type: EChannel
}


@InputType()
export class FilterSpeakingClubDto {
    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: 'Name must be string' })
    name: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: 'Level must be string' })
    level: ELevel


    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: 'Language must be string' })
    language: ELanguage


    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: 'Type must be string' })
    type: EChannel
}

@InputType()
export class GetChannelDto {
    @Field(() => String)
    @IsNotEmpty({ message: "Id is required" })
    @IsString({ message: 'Id must be string' })
    id: string
}