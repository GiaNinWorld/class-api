import { Controller, Get, Param, Query } from '@nestjs/common'
import { Product } from '../model/Product'
import { ProductService } from '../service/product.service'
import { PaginationDto, PaginationResultDto } from 'src/dto/PaginationDto'

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    return await this.productService.findProductById(id)
  }

  @Get()
  getAllProducts(@Query() paginationDto: PaginationDto): PaginationResultDto {
    return this.productService.getAllProducts(paginationDto)
  }
}
