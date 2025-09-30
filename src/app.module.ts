import { Module } from '@nestjs/common'
import { AppController } from './controller/app.controller'
import { AppService } from './service/app.service'
import { ProductService } from './service/product.service'
import { ProductResolver } from './resolver/product.resolver'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo'
import { join } from 'path'
import { ProductController } from './controller/product.controller'
import { CartController } from './controller/cart.controller'
import { CartService } from './service/cart.service'
import { CartResolver } from './resolver/cart.resolver'
import { PaginationFactory } from './util/pagination.factory'
import { ConfigModule } from '@nestjs/config'
import { RedisCacheService } from './service/redis_cache.service'
import { CACHE_SERVICE } from './constants/cache.constants'
import { TimeoutService } from './service/timeout.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
  ],
  controllers: [AppController, ProductController, CartController],
  providers: [
    AppService,
    ProductService,
    CartService,
    ProductResolver,
    CartResolver,
    TimeoutService,
    { provide: CACHE_SERVICE, useClass: RedisCacheService },
    PaginationFactory,
  ],
})
export class AppModule {}
