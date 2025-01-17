import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateExpenseDto {
  @Field(() => Number, { nullable: true })
  @IsNotEmpty({ message: 'Date is required' })
  @IsNumber({}, { message: 'Date must be number' })
  date: number;

  @Field(() => String, { nullable: true })
  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be string' })
  description: string;

  @Field(() => Number, { nullable: true })
  @IsNotEmpty({ message: 'Amount is required' })
  @IsNumber({}, { message: 'Date must be number' })
  amount: number;
}
