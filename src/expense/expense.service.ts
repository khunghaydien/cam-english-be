import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateExpenseDto, FilterExpenseDto } from './dto';
import { User } from 'src/user/entities';
import { Expense, Expenses } from './entities';
import { Prisma } from '@prisma/client';

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
          date: date.toString(),
          description,
          amount,
          authorId: user.id,
        },
        include: {
          author: true,
        },
      });
      return {
        ...expense,
        date: parseInt(expense.date),
      };
    } catch (error) {
      throw new BadRequestException({
        Expense: 'An error occurred while creating Expense.',
      });
    }
  }
  async getExpense(
    { fromDate, toDate, description, amount }: FilterExpenseDto,
    user: User,
  ): Promise<Expenses> {
    const where: Prisma.ExpenseWhereInput = {
      authorId: user.id,
      ...(fromDate && {
        createdAt: {
          gte: new Date(new Date(fromDate).setHours(0, 0, 0, 0)),
        },
      }),
      ...(toDate && {
        createdAt: {
          lte: new Date(new Date(toDate).setHours(23, 59, 59, 999)),
        },
      }),
      ...(description && {
        description: { contains: description, mode: 'insensitive' },
      }),
      ...(amount && { amount }),
    };
    try {
      const expenses = await this.prismaService.expense.findMany({
        where,
        include: {
          author: true,
        },
      });
      return {
        data: expenses.map((expense) => {
          return {
            ...expense,
            date: parseInt(expense.date),
          };
        }),
      };
    } catch (error) {
      throw new BadRequestException({ error });
    }
  }
}
