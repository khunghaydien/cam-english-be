import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class FilterExpenseDto {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'Name must be string' })
  fromDate: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'Name must be string' })
  toDate: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'Name must be string' })
  description: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString({ message: 'Name must be string' })
  amount: string;
}
