import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProductService } from './service/product.service'
import { ProductResolver } from './resolver/product.resolver'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo'
import { join } from 'path'
import { ProductController } from './controller/product.controller'
import { CartController } from './controller/cart.controller'
import { CartService } from './service/cart.service'
import { CartResolver } from './resolver/cart.resolver'
import { CacheModule } from '@nestjs/cache-manager'
import { redisStore } from 'cache-manager-redis-store'
import { CacheService } from './service/cache.service'
import { PaginationFactory } from './util/pagination.factory'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    CacheModule.register({
      isGlobal: true,
      store: async () =>
        await redisStore({
          socket: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
          },
        }),
    }),
  ],
  controllers: [AppController, ProductController, CartController],
  providers: [AppService, ProductService, CartService, ProductResolver, CartResolver, CacheService, PaginationFactory],
})
export class AppModule {}
