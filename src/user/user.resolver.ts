import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities';
import { AuthorizationLoginDto, CreateUserDto } from './dto';

@Resolver()
export class UserResolver {
    constructor(
        private readonly userService: UserService
    ) { }

    @Mutation(() => User, { nullable: true })
    async authorizationLogin(@Args('authorizationLoginDto') authorizationLoginDto: AuthorizationLoginDto): Promise<User> {
        return await this.userService.authorizationLogin(authorizationLoginDto)
    }

    @Mutation(() => User, { nullable: true })
    async createUser(@Args('createUserDto') createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.createUser(createUserDto)
    }
}
