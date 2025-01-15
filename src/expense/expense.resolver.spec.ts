import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseResolver } from './expense.resolver';

describe('ExpenseResolver', () => {
  let resolver: ExpenseResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseResolver],
    }).compile();

    resolver = module.get<ExpenseResolver>(ExpenseResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
