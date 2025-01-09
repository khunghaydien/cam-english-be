import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from './entities';
import { AuthorizationSignInDto, SignUpDto } from './dto';
import { SignInDto } from './dto/sign-in.dto';
@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async verifyUser(sessionToken: string): Promise<User | null> {
    const payload = await this.jwtService.verify(sessionToken, {
      secret: this.configService.get<string>('NEXTAUTH_SECRET'),
    });
    return await this.findUserByEmail(payload.email);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({ where: { email } });
  }

  async authorizationSignIn({
    name,
    email,
    image,
  }: AuthorizationSignInDto): Promise<User> {
    const user = await this.findUserByEmail(email);
    if (user) return user;
    try {
      return await this.prismaService.user.create({
        data: {
          name,
          email,
          image,
          password: bcrypt.hash(randomUUID(), 10),
        },
      });
    } catch {
      throw new BadRequestException({
        user: 'An error occurred while SignIn.',
      });
    }
  }

  async signIn({ email, password }: SignInDto): Promise<User> {
    const user = await this.findUserByEmail(email);
    if (!user)
      throw new BadRequestException({ email: 'Email does not exist.' });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException({ password: 'Incorrect password.' });
    }
    return user;
  }

  async signUp({ name, email, image, password }: SignUpDto): Promise<User> {
    if (await this.findUserByEmail(email)) {
      throw new BadRequestException({ email: 'Email already exists.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      return await this.prismaService.user.create({
        data: {
          name,
          email,
          image,
          password: hashedPassword,
        },
      });
    } catch(e) {
      throw new BadRequestException({
        user: e,
      });
    }
  }
}
