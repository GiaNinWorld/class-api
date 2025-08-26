import { Injectable, NotFoundException } from '@nestjs/common'
import { Product } from 'src/model/Product'
import { products } from '../data/Products'
import { ProductGql } from 'src/model/ProductGql'

@Injectable()
export class ProductService {
  findProductById(id: string): Product {
    const product = products.find(p => p.id === id)

    if (!product) {
      throw new NotFoundException('Produto não encontrado')
    }

    return product
  }

  findProductGqlById(id: string): ProductGql {
    const product = products.find(p => p.id === id)

    if (!product) {
      throw new NotFoundException('Produto não encontrado')
    }

    return product
  }
}
