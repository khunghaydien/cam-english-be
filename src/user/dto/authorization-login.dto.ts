import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AuthorizationLoginDto {
    @Field(() => String)
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: "Name must be string" })
    name: string

    @Field()
    @IsNotEmpty({ message: 'Email is requied.' })
    @IsEmail({}, { message: 'Email must be valid' })
    email: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: "Emage must be string" })
    image: string
}