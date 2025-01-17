import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class FilterExpenseDto {
  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsString({ message: 'From Date must be number' })
  fromDate: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsString({ message: 'To Date must be number' })
  toDate: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'Name must be string' })
  description: string;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsString({ message: 'Amount must be number' })
  amount: number;
}
