import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateExpenseDto } from './dto';
import { User } from 'src/user/entities';
import { Expense } from './entities';

@Injectable()
export class ExpenseService {
  constructor(private readonly prismaService: PrismaService) {}
  async createExpense(
    { date, description, amount }: CreateExpenseDto,
    user: User,
  ): Promise<Expense> {
    try {
      const expense = await this.prismaService.expense.create({
        data: {
          date,
          description,
          amount,
          authorId: user.id,
        },
        include: {
          author: true,
        },
      });
      console.log(expense);
      return expense;
    } catch (error) {
      throw new BadRequestException({
        Expense: 'An error occurred while creating Expense.',
      });
    }
  }
}
