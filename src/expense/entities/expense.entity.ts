import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities';
@ObjectType()
export class Expense {
  @Field()
  id: string;

  @Field({ nullable: true })
  date?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  amount?: string;

  @Field(() => String, { nullable: true })
  authorId?: string;

  @Field(() => User, { nullable: true })
  author?: User;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
