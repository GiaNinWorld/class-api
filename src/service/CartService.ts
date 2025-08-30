import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { Cart, CartItem } from '../model/Cart'
import { Product } from '../model/Product'
import { products } from '../data/Products'

@Injectable()
export class CartService {
  private carts: Map<string, Cart> = new Map()
  private nextCartId: number = 1

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

  getCart(cartId: string): Cart {
    const cart = this.carts.get(cartId)
    if (!cart) {
      throw new NotFoundException('Carrinho não encontrado')
    }
    return cart
  }

  addItemToCart(cartId: string, productId: string, quantity: number = 1): Cart {
    const cart = this.getCart(cartId)
    const product = this.findProduct(productId)

    if (quantity <= 0) {
      throw new BadRequestException('Quantidade deve ser maior que zero')
    }

    const existingItemIndex = cart.items.findIndex(item => item.productId === productId)

    if (existingItemIndex >= 0) {
      cart.items[existingItemIndex].quantity += quantity
    } else {
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

  clearCart(cartId: string): Cart {
    const cart = this.getCart(cartId)
    
    cart.items = []
    cart.total = 0
    cart.updatedAt = new Date()
    this.carts.set(cartId, cart)

    return cart
  }

  deleteCart(cartId: string): void {
    const cart = this.carts.get(cartId)
    if (!cart) {
      throw new NotFoundException('Carrinho não encontrado')
    }
    this.carts.delete(cartId)
  }

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
    const currentId = this.nextCartId.toString()
    this.nextCartId++
    return currentId
  }
}
**
