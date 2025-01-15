import { Module } from '@nestjs/common';
import { ExpenseResolver } from './expense.resolver';
import { ExpenseService } from './expense.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ExpenseResolver, ExpenseService, PrismaService],
})
export class ExpenseModule {}
