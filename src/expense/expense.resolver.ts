import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ExpenseService } from './expense.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/services/auth-guard.service';
import { RolesGuard } from 'src/common/services/roles-guard.service';
import { Expense, Expenses } from './entities';
import { User } from 'src/user/entities';
import { CreateExpenseDto, FilterExpenseDto } from './dto';

@Resolver()
export class ExpenseResolver {
  constructor(private readonly expenseService: ExpenseService) {}
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

  @UseGuards(AuthGuard, RolesGuard('ADMIN', 'MEMBER'))
  @Query(() => Expenses, { nullable: true })
  async getExpense(
    @Args('filterExpenseDto', { nullable: true })
    filterExpenseDto: FilterExpenseDto,
    @Context() context: { user: User },
  ): Promise<Expenses> {
    return await this.expenseService.getExpense(filterExpenseDto, context.user);
  }
}
