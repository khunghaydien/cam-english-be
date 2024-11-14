import { Field, InputType } from "@nestjs/graphql";
import { IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";

@InputType()
export class PaginationDto {
    @Field({ nullable: true })
    @IsOptional()
    @IsInt({ message: "Page must be integer" })
    @Min(1, { message: "Page must be at least 1" })
    page?: number;

    @Field({ nullable: true })
    @IsOptional()
    @IsInt({ message: "Page size must be integer" })
    pageSize?: number;

    @Field({ nullable: true })
    @IsOptional()
    @IsInt({ message: "Initial must be integer" })
    initial?: number;
}

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