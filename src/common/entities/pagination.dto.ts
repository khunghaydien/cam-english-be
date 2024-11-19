import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Pagination {
    @Field()
    currentPage: number;

    @Field()
    pageSize: number;

    @Field()
    totalElements: number;

    @Field()
    totalPages: number
}