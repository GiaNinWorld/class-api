import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/model/Product';
import { products } from '../data/Products';
import { ProductGql } from 'src/model/ProductGql';

@Injectable()
export class ProductService {
  private findRawById(id: string): Product {
    const product = products.find(p => p.id === id);

    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }

    return product;
  }

  findProductById(id: string): Product {
    return this.findRawById(id);
  }

  findProductGqlById(id: string): ProductGql {
    return this.findRawById(id);
  }
}
