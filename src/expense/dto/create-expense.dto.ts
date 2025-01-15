import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateExpenseDto {
  @Field(() => String, { nullable: true })
  @IsNotEmpty({ message: 'Description is required' })
  date: string;

  @Field(() => String, { nullable: true })
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @Field(() => String, { nullable: true })
  @IsNotEmpty({ message: 'Description is required' })
  amount: string;
}
