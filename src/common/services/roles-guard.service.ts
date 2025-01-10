import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
export type Role = 'ADMIN' | 'MEMBER';
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly roles: Role[]) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context).getContext();
    const user = ctx.user;

    if (!user) {
      throw new ForbiddenException('User not found in context');
    }

    // Kiểm tra vai trò
    if (!this.roles.includes(user.role)) {
      throw new ForbiddenException('You do not have permission to access this resource');
    }

    return true;
  }
}

export function RolesGuard(...roles: Role[]) {
  return new RoleGuard(roles);
}
