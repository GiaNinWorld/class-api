import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { Cart, CartItem } from '../model/Cart'
import { Product } from '../model/Product'
import { products } from '../data/Products'

@Injectable()
export class CartService {
  private carts: Map<string, Cart> = new Map()

  // Criar um novo carrinho
  createCart(): Cart {
    const cartId = this.generateCartId()
    const cart: Cart = {
      id: cartId,
      items: [],
      total: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.carts.set(cartId, cart)
    return cart
  }

  // Obter carrinho por ID
  getCart(cartId: string): Cart {
    const cart = this.carts.get(cartId)
    if (!cart) {
      throw new NotFoundException('Carrinho não encontrado')
    }
    return cart
  }

  // Adicionar item ao carrinho (POST)
  addItemToCart(cartId: string, productId: string, quantity: number = 1): Cart {
    const cart = this.getCart(cartId)
    const product = this.findProduct(productId)

    if (quantity <= 0) {
      throw new BadRequestException('Quantidade deve ser maior que zero')
    }

    const existingItemIndex = cart.items.findIndex(item => item.productId === productId)

    if (existingItemIndex >= 0) {
      // Atualizar quantidade do item existente
      cart.items[existingItemIndex].quantity += quantity
    } else {
      // Adicionar novo item
      const newItem: CartItem = {
        productId: product.id,
        quantity,
        price: product.price,
        name: product.name,
        image: product.image,
      }
      cart.items.push(newItem)
    }

    this.updateCartTotal(cart)
    cart.updatedAt = new Date()
    this.carts.set(cartId, cart)

    return cart
  }

  // Atualizar item do carrinho (PUT)
  updateCartItem(cartId: string, productId: string, quantity: number): Cart {
    const cart = this.getCart(cartId)

    if (quantity <= 0) {
      throw new BadRequestException('Quantidade deve ser maior que zero')
    }

    const itemIndex = cart.items.findIndex(item => item.productId === productId)
    if (itemIndex === -1) {
      throw new NotFoundException('Item não encontrado no carrinho')
    }

    cart.items[itemIndex].quantity = quantity
    this.updateCartTotal(cart)
    cart.updatedAt = new Date()
    this.carts.set(cartId, cart)

    return cart
  }

  // Remover item do carrinho (DELETE)
  removeItemFromCart(cartId: string, productId: string): Cart {
    const cart = this.getCart(cartId)
    
    const itemIndex = cart.items.findIndex(item => item.productId === productId)
    if (itemIndex === -1) {
      throw new NotFoundException('Item não encontrado no carrinho')
    }

    cart.items.splice(itemIndex, 1)
    this.updateCartTotal(cart)
    cart.updatedAt = new Date()
    this.carts.set(cartId, cart)

    return cart
  }

  // Limpar carrinho (DELETE)
  clearCart(cartId: string): Cart {
    const cart = this.getCart(cartId)
    
    cart.items = []
    cart.total = 0
    cart.updatedAt = new Date()
    this.carts.set(cartId, cart)

    return cart
  }

  // Deletar carrinho (DELETE)
  deleteCart(cartId: string): void {
    const cart = this.carts.get(cartId)
    if (!cart) {
      throw new NotFoundException('Carrinho não encontrado')
    }
    this.carts.delete(cartId)
  }

  // Métodos auxiliares
  private findProduct(productId: string): Product {
    const product = products.find(p => p.id === productId)
    if (!product) {
      throw new NotFoundException('Produto não encontrado')
    }
    return product
  }

  private updateCartTotal(cart: Cart): void {
    cart.total = cart.items.reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)
  }

  private generateCartId(): string {
    return `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
}

