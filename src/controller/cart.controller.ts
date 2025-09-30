import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { CartService } from '../service/cart.service'
import { Cart, CartItem } from '../model/Cart'
import { AddItemDto } from '../dto/AddItemDto'
import { UpdateItemDto } from '../dto/UpdateItemDto'
import { TimeoutService } from '../service/timeout.service'

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly timeoutService: TimeoutService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCart(): Promise<Cart> {
    return this.cartService.createCart()
  }

  @Get(':id')
  async getCart(@Param('id') cartId: string): Promise<Cart> {
    return this.cartService.findCartById(cartId)
  }

  @Get(':id/add')
  async getCartItems(@Param('id') cartId: string): Promise<CartItem[]> {
    return this.cartService.findCartById(cartId).items
  }

  @Post(':id/add')
  async addItemToCart(@Param('id') cartId: string, @Body() addItemDto: AddItemDto): Promise<Cart> {
    // Simula processamento que pode demorar
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Implementa timeout de 3 segundos para o processamento do pedido
    const TIMEOUT_MS = 3000
    const timeoutMessage = 'Processamento do pedido excedeu o tempo limite de 3 segundos'
    
    return this.timeoutService.executeWithTimeout(
      () => this.cartService.addItemToCart(cartId, addItemDto.productId, addItemDto.quantity || 1),
      TIMEOUT_MS,
      timeoutMessage
    )
  }

  @Put(':id/items/:productId')
  async updateCartItem(
    @Param('id') cartId: string,
    @Param('productId') productId: string,
    @Body() updateItemDto: UpdateItemDto,
  ): Promise<Cart> {
    return this.cartService.updateCartItem(cartId, productId, updateItemDto.quantity)
  }

  @Delete(':id/items/:productId')
  async removeItemFromCart(@Param('id') cartId: string, @Param('productId') productId: string): Promise<Cart> {
    return this.cartService.removeItemFromCart(cartId, productId)
  }

  @Delete(':id/items')
  async clearCart(@Param('id') cartId: string): Promise<Cart> {
    return this.cartService.clearCart(cartId)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCart(@Param('id') cartId: string): Promise<void> {
    this.cartService.deleteCart(cartId)
  }
}
