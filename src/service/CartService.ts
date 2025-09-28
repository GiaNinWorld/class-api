import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { Cart, CartItem } from '../model/Cart'
import { carts } from 'src/data/Carts'
import { ProductService } from './ProductService'

@Injectable()
export class CartService {
  private nextCartId: number = 1

  constructor(private readonly productService: ProductService) {}

  createCart(): Cart {
    const cart: Cart = {
      id: this.generateCartId(),
      items: [],
      total: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    carts.push(cart)
    return cart
  }

  findCartById(id: string): Cart {
    const cart = carts.find(p => p.id === id)

    if (!cart) {
      throw new NotFoundException(`Carrinho com ID ${id} não encontrado`)
    }

    this.updateCartTotal(cart)

    return {
      ...cart,
      itemsCount: cart.items.length,
    }
  }

  addItemToCart(cartId: string, productId: string, quantity: number = 1): Cart {
    const cart = this.findCartById(cartId)
    const product = this.productService.findProductById(productId)

    if (quantity <= 0) {
      throw new BadRequestException('Quantidade do produto deve ser maior que zero')
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

    return cart
  }

  updateCartItem(cartId: string, productId: string, quantity: number): Cart {
    const cart = this.findCartById(cartId)

    if (quantity <= 0) {
      throw new BadRequestException('Quantidade do produto deve ser maior que zero')
    }

    const itemIndex = cart.items.findIndex(item => item.productId === productId)
    if (itemIndex === -1) {
      throw new NotFoundException('Item não encontrado no carrinho')
    }

    cart.items[itemIndex].quantity = quantity
    this.updateCartTotal(cart)
    cart.updatedAt = new Date()

    return cart
  }

  removeItemFromCart(cartId: string, productId: string): Cart {
    const cart = this.findCartById(cartId)

    const itemIndex = cart.items.findIndex(item => item.productId === productId)
    if (itemIndex === -1) {
      throw new NotFoundException('Item não encontrado no carrinho')
    }

    cart.items.splice(itemIndex, 1)
    this.updateCartTotal(cart)
    cart.updatedAt = new Date()

    return cart
  }

  clearCart(cartId: string): Cart {
    const cart = this.findCartById(cartId)

    cart.items = []
    cart.total = 0
    cart.updatedAt = new Date()

    return cart
  }

  deleteCart(cartId: string): void {
    const cart = this.findCartById(cartId)

    if (!cart) {
      throw new NotFoundException('Carrinho não encontrado')
    }

    const cartIndex = carts.findIndex(cart => cart.id !== cartId)
    if (cartIndex >= 0) {
      carts.splice(cartIndex, 1)
    }
  }

  private updateCartTotal(cart: Cart): void {
    cart.total = cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  private generateCartId(): string {
    const currentId = this.nextCartId.toString()
    this.nextCartId++
    return currentId
  }
}
