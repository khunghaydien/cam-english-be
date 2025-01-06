import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt'
import { randomUUID } from 'crypto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from './entities';
import { AuthorizationLoginDto, CreateUserDto } from './dto';
@Injectable()
export class UserService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    async verifyUser(sessionToken: string): Promise<User | null> {
        const payload = await this.jwtService.verify(sessionToken, {
            secret: this.configService.get<string>('NEXTAUTH_SECRET'),
        });
        return await this.findUserByEmail(payload.email)
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return await this.prismaService.user.findUnique({ where: { email } });
    }

    async authorizationLogin({ name, email, image }: AuthorizationLoginDto): Promise<User> {
        const user = await this.findUserByEmail(email);
        if (user) return user
        try {
            return await this.prismaService.user.create({
                data: {
                    name,
                    email,
                    image,
                    password: bcrypt.hash(randomUUID(), 10)
                },
            });
        } catch {
            throw new BadRequestException({ user: 'An error occurred while login.' });
        }
    }

    async createUser({ name, email, image, password }: CreateUserDto): Promise<User> {
        if (await this.findUserByEmail(email)) {
            throw new BadRequestException({ email: 'Email already exists.' });
        }
        try {
            return await this.prismaService.user.create({
                data: {
                    name,
                    email,
                    image,
                    password: bcrypt.hash(password, 10)
                },
            });
        } catch {
            throw new BadRequestException({ user: 'An error occurred while creating user.' });
        }
    }
}
