import { Controller, Get, Param, Query } from '@nestjs/common'
import { Product } from '../model/Product'
import { ProductService } from '../service/ProductService'
import { PaginationDto } from 'src/dto/PaginationDto'
import { PaginationResultDto } from 'src/dto/PaginationResultDto'

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':id')
  getProductById(@Param('id') id: string): Product {
    return this.productService.findProductById(id)
  }

  @Get()
  getAllProducts(@Query() paginationDto: PaginationDto): PaginationResultDto {
    return this.productService.getAllProducts(paginationDto)
  }
}
