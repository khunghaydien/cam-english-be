import { Field, ObjectType } from "@nestjs/graphql";
@ObjectType()
export class User {
    @Field()
    id: string

    @Field(() => String, { nullable: null })
    name: string

    @Field(() => String, { nullable: true })
    email: String

    @Field(() => String, { nullable: true })
    image: String
}
