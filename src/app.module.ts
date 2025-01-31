import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { AppResolver } from './app.resolver';
import { CommonModule } from './common/common.module';
import { SpeakingClubModule } from './speaking-club/speaking-club.module';
import { ExpenseModule } from './expense/expense.module';
@Global()
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src.schema.gql'),
      sortSchema: true,
      playground: true,
      path: '/graphql',
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true
      },
      context: ({ req, res }) => ({ req, res })
    }),
    UserModule,
    SpeakingClubModule,
    CommonModule,
    ExpenseModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule { }
