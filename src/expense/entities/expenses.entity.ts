import { Expense } from './expense.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Expenses {
  @Field(() => [Expense])
  data: Expense[];
}
