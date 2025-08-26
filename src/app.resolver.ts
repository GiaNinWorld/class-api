import { ProductGql } from './model/ProductGql'
import { ProductService } from './service/ProductService'
import { Resolver, Query, Args } from '@nestjs/graphql'

@Resolver(() => ProductGql)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => ProductGql)
  products(@Args('id', { type: () => String }) id: string) {
    return this.productService.findProductGqlById(id)
  }
}
