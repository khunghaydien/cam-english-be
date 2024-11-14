import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUserDto {
    @Field(() => String)
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: "Name must be string" })
    name: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: "Password must be string" })
    @Length(8, 16, { message: "Password must be between 8 and 16 characters" })
    password: string

    @Field()
    @IsNotEmpty({ message: 'Email is requied.' })
    @IsEmail({}, { message: 'Email must be valid' })
    email: string

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString({ message: "Emage must be string" })
    image: string
}
@InputType()
export class SignUpByGoogleDto extends CreateUserDto { }
@InputType()
export class SignUpDto extends CreateUserDto { }