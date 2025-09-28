import { Injectable, NotFoundException } from '@nestjs/common'
import { Product } from 'src/model/Product'
import { products } from '../data/Products'
import { ProductGql } from 'src/model/ProductGql'
import { PaginationDto, PaginationResultDto } from 'src/dto/PaginationDto'
import { CacheService } from './cache.service'
import { PaginationFactory } from '../util/pagination.factory'

@Injectable()
export class ProductService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly paginationFactory: PaginationFactory,
  ) {}

  async findProductById(id: string): Promise<Product | ProductGql> {
    const cacheKey = `product:${id}`

    const cachedProduct = await this.cacheService.get<Product | ProductGql>(cacheKey)
    if (cachedProduct) {
      return cachedProduct
    }

    await this.sleep(5000)

    const product = products.find(p => p.id === id)

    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`)
    }

    await this.cacheService.set(cacheKey, product, 60)

    return product
  }

  getAllProducts(paginationDto: PaginationDto): PaginationResultDto {
    return this.paginationFactory.create(paginationDto, products)
  }

  private async sleep(timeInMs: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, timeInMs))
  }
}
