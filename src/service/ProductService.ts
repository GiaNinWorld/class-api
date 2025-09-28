import { Injectable, NotFoundException } from '@nestjs/common'
import { Product } from 'src/model/Product'
import { products } from '../data/Products'
import { ProductGql } from 'src/model/ProductGql'
import { PaginationDto } from 'src/dto/PaginationDto'
import { PaginationResultDto } from 'src/dto/PaginationResultDto'

@Injectable()
export class ProductService {
  findProductById(id: string): Product | ProductGql {
    const product = products.find(p => p.id === id)

    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`)
    }

    return product
  }

  getAllProducts(paginationDto: PaginationDto): PaginationResultDto {
    const { limit = 10, offset = 0 } = paginationDto

    const result: Product[] = []
    for (let i = offset; i < offset + limit; i++) {
      if (i >= products.length) {
        break
      }

      result.push(products[i])
    }

    const total = products.length
    const hasNext = total > offset + limit

    return {
      data: result,
      total,
      limit,
      offset,
      hasNext,
      nextPage: hasNext ? offset + limit : null,
    }
  }
}
