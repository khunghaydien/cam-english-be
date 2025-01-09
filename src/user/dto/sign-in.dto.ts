import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SignInDto {
    @Field(() => String)
    @IsNotEmpty({ message: 'Email is requied.' })
    @IsEmail({}, { message: 'Email must be valid' })
    email: string

    @Field(() => String)
    @IsNotEmpty({ message: 'Password is requied.' })
    @IsString({ message: "Password must be string" })
    password: string
}