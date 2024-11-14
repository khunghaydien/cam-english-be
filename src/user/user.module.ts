import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Global()
@Module({
  providers: [UserService, UserResolver, PrismaService, JwtService, ConfigService],
  exports: [UserService]
})
export class UserModule { }
