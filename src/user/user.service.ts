import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto, SignUpByGoogleDto } from './user.dto';
import { User } from './user.response';

@Injectable()
export class UserService {
    constructor(
        private readonly prismaService: PrismaService
    ) { }

    async existedEmail(email: string): Promise<User> {
        try {
            return this.prismaService.user.findUnique({
                where: {
                    email
                }
            })
        } catch (error) {
            throw new BadRequestException({ existedEmail: 'An error occurred while checking existed email.' })
        }
    }

    async createUser({ name, email, image, password }: CreateUserDto): Promise<User> {
        try {
            return await this.prismaService.user.create({
                data: {
                    name,
                    email,
                    password,
                    image
                }
            })
        } catch (error) {
            throw new BadRequestException({ createUser: 'An error occurred while creating user.' })
        }
    }

    async signUpByGoogle(signUpByGoogleDto: SignUpByGoogleDto): Promise<User> {
        const existedUser = await this.existedEmail(signUpByGoogleDto.email)
        if (!existedUser) return await this.createUser(signUpByGoogleDto)
        return existedUser
    }

    async signUp(signUpDto: SignUpDto): Promise<User> {
        const existedUser = await this.existedEmail(signUpDto.email)
        if (existedUser) {
            throw new BadRequestException({ signUp: 'Email existed' })
        } return await this.createUser(signUpDto)
        return existedUser
    }
}
