import { Controller, Get, Param } from '@nestjs/common'
import { Product } from './model/Product'
import { ProductService } from './service/ProductService'

@Controller()
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) {}

  @Get('product/:id')
  getProductById(@Param('id') id: string): Product {
    return this.productService.findProductById(id)
  }
}
