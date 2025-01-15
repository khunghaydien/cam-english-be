import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { ExpenseService } from './expense.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/services/auth-guard.service';
import { RolesGuard } from 'src/common/services/roles-guard.service';
import { Expense } from './entities';
import { User } from 'src/user/entities';
import { CreateExpenseDto } from './dto';

@Resolver()
export class ExpenseResolver {
  constructor(
    private readonly expenseService: ExpenseService
  ) {}
  @UseGuards(AuthGuard, RolesGuard('ADMIN', 'MEMBER'))
  @Mutation(() => Expense, { nullable: true })
  async createExpense(
    @Args('createExpenseDto') createExpenseDto: CreateExpenseDto,
    @Context() context: { user: User },
  ): Promise<Expense> {
    return await this.expenseService.createExpense(
      createExpenseDto,
      context.user,
    );
  }
}
