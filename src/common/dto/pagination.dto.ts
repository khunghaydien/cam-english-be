import { Field, InputType } from "@nestjs/graphql";
import { IsInt, IsOptional, Min } from "class-validator";

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