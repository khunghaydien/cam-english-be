import { Field, InputType } from "@nestjs/graphql";
import { IsEnum, IsOptional, IsString } from "class-validator";

export enum SortOrder {
    ASC = 'asc',
    DESC = 'desc'
}

@InputType()
export class OrderByDto {
    @Field({ nullable: true })
    @IsString()
    @IsOptional()
    field?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsEnum(SortOrder)
    order?: SortOrder;
}