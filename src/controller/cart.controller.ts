import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { CartService } from '../service/cart.service'
import { Cart, CartItem } from '../model/Cart'
import { AddItemDto } from '../dto/AddItemDto'
import { UpdateItemDto } from '../dto/UpdateItemDto'

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

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
    await new Promise(resolve => setTimeout(resolve, 1500))
    return this.cartService.addItemToCart(cartId, addItemDto.productId, addItemDto.quantity || 1)
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
