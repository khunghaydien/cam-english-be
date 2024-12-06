import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt'
import { randomUUID } from 'crypto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from './entities';
import { CreateUserDto } from './dto';
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

    async hashPassword(password?: string): Promise<string> {
        return await bcrypt.hash(password ?? randomUUID(), 10);
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return await this.prismaService.user.findUnique({ where: { email } });
    }

    async createUser(data: CreateUserDto): Promise<User> {
        const { name, email, image, password } = data;
        const hashedPassword = await this.hashPassword(password);
        try {
            return await this.prismaService.user.create({
                data: { name, email, password: hashedPassword, image },
            });
        } catch {
            throw new BadRequestException({ user: 'An error occurred while creating user.' });
        }
    }

    async createUserFromProviders(data: CreateUserDto): Promise<User> {
        const user = await this.findUserByEmail(data.email);
        return user ?? await this.createUser(data);
    }

    async createUserFromCredentials(data: CreateUserDto): Promise<User> {
        if (await this.findUserByEmail(data.email)) {
            throw new BadRequestException({ email: 'Email already exists.' });
        }
        return await this.createUser(data);
    }
}
