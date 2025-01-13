import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities';
import { AuthorizationSignInDto, SignInDto, SignUpDto } from './dto';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User, { nullable: true })
  async authorizationSignIn(
    @Args('authorizationSignInDto')
    authorizationSignInDto: AuthorizationSignInDto,
  ): Promise<User> {
    return await this.userService.authorizationSignIn(authorizationSignInDto);
  }

  @Mutation(() => User, { nullable: true })
  async signIn(@Args('signInDto') signInDto: SignInDto): Promise<User> {
    return await this.userService.signIn(signInDto);
  }

  @Mutation(() => User, { nullable: true })
  async signUp(@Args('signUpDto') signUpDto: SignUpDto): Promise<User> {
    return await this.userService.signUp(signUpDto);
  }
}
