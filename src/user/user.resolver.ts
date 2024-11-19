import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities';
import { CreateUserDto } from './dto';

@Resolver()
export class UserResolver {
    constructor(
        private readonly userService: UserService
    ) { }

    @Mutation(() => User, { nullable: true })
    async createUserFromProviders(@Args('createUserFromProvidersDto') createUserFromProvidersDto: CreateUserDto): Promise<User> {
        return await this.userService.createUserFromProviders(createUserFromProvidersDto)
    }

    @Mutation(() => User, { nullable: true })
    async createUserFromCredentials(@Args('createUserFromCredentialsDto') createUserFromCredentialsDto: CreateUserDto): Promise<User> {
        return await this.userService.createUserFromCredentials(createUserFromCredentialsDto)
    }
}
