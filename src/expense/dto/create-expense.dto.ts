import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateExpenseDto {
  @Field(() => String, { nullable: true })
  @IsNotEmpty({ message: 'Date is required' })
  @IsString({ message: 'Date must be string' })
  date: string;

  @Field(() => String, { nullable: true })
  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be string' })
  description: string;

  @Field(() => String, { nullable: true })
  @IsNotEmpty({ message: 'Amount is required' })
  @IsString({ message: 'Amount must be string' })
  amount: string;
}
