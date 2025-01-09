import { Field, ObjectType } from "@nestjs/graphql";
import { $Enums } from "@prisma/client";
@ObjectType()
export class User {
    @Field()
    id: string

    @Field(() => String, { nullable: true })
    password?: string

    @Field(() => String, { nullable: null })
    name?: string

    @Field(() => String, { nullable: true })
    email?: String

    @Field(() => String, { nullable: true })
    image?: String

    @Field(() => String, { nullable: true })
    role?: $Enums.Role
}