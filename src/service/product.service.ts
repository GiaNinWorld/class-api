import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { Product } from 'src/model/Product'
import { products } from '../data/Products'
import { ProductGql } from 'src/model/ProductGql'
import { PaginationDto, PaginationResultDto } from 'src/dto/PaginationDto'
import { CacheService } from '../interfaces/cache.service.interface'
import { PaginationFactory } from '../util/pagination.factory'
import { CACHE_SERVICE } from 'src/constants/cache.constants'

@Injectable()
export class ProductService {
  // Campos essenciais para listagem de produtos (otimização de consulta)
  static readonly PAGINATION_FIELDS = ['id', 'name', 'price', 'category', 'inStock']
  
  // Campos completos para detalhes do produto
  static readonly FULL_PRODUCT_FIELDS = ['id', 'name', 'price', 'originalPrice', 'description', 'image', 'category', 'inStock']

  constructor(
    @Inject(CACHE_SERVICE) private readonly cacheService: CacheService,
    private readonly paginationFactory: PaginationFactory,
  ) {}

  async findProductById(id: string): Promise<Product | ProductGql> {
    const cacheKey = `product:${id}`

    const cachedProduct = await this.cacheService.get<Product | ProductGql>(cacheKey)
    if (cachedProduct) {
      return cachedProduct
    }

    const product = products.find(p => p.id === id)

    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`)
    }

    await this.cacheService.set(cacheKey, product, 60)

    return product
  }

  getAllProducts(paginationDto: PaginationDto): PaginationResultDto {
    // Otimização: seleciona apenas os campos necessários para listagem
    const optimizedProducts = this.selectFields(products, ProductService.PAGINATION_FIELDS)
    return this.paginationFactory.create(paginationDto, optimizedProducts, ProductService.PAGINATION_FIELDS)
  }

  async getOptimizedProducts(paginationDto: PaginationDto): Promise<PaginationResultDto> {
    // Endpoint otimizado: retorna apenas campos essenciais para melhor performance
    const cacheKey = `products:optimized:${paginationDto.limit || 10}:${paginationDto.offset || 0}`
    
    const cachedResult = await this.cacheService.get<PaginationResultDto>(cacheKey)
    if (cachedResult) {
      return cachedResult
    }

    const optimizedProducts = this.selectFields(products, ProductService.PAGINATION_FIELDS)
    const result = this.paginationFactory.create(paginationDto, optimizedProducts, ProductService.PAGINATION_FIELDS)
    
    // Cache por 5 minutos para otimização
    await this.cacheService.set(cacheKey, result, 300)
    
    return result
  }

  /**
   * Otimização de consulta: seleciona apenas os campos necessários
   * Simula o comportamento de SELECT específico em banco de dados
   */
  private selectFields<T extends Record<string, any>>(data: T[], fields: string[]): Partial<T>[] {
    return data.map(item => {
      const selectedItem: Partial<T> = {}
      fields.forEach(field => {
        if (field in item) {
          selectedItem[field as keyof T] = item[field as keyof T]
        }
      })
      return selectedItem
    })
  }
}
