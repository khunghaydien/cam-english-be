import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { GqlExecutionContext } from '@nestjs/graphql';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const req = ctx?.req;
    const sessionToken = req?.cookies?.['next-auth.session-token'] as string;
    if (!sessionToken) {
      throw new UnauthorizedException('Session token is missing');
    }
    const user = await this.userService.verifyUser(sessionToken);
    if (!user) throw new UnauthorizedException('Invalid or expired token');
    ctx.user = user;
    return true;
  }
}
