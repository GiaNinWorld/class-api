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

  getProductById(id: string): Product {
    return this.findRawById(id);
  }

  getProductGqlById(id: string): ProductGql {
    return this.findRawById(id) as ProductGql;
  }
}
