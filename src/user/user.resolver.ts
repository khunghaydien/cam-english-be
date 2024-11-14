import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './user.response';
import { SignUpByGoogleDto, SignUpDto } from './user.dto';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
    constructor(
        private readonly userService: UserService
    ) { }

    @Mutation(() => User, { nullable: true })
    async signUpByGoogle(@Args('signUpByGoogleDto') signUpByGoogleDto: SignUpByGoogleDto): Promise<User> {
        return await this.userService.signUpByGoogle(signUpByGoogleDto)
    }

    @Mutation(() => User, { nullable: true })
    async signUp(@Args('signUp') signUpDto: SignUpDto): Promise<User> {
        return await this.userService.signUp(signUpDto)
    }
}
