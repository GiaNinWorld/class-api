import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { CartService } from '../service/CartService'
import { Cart } from '../model/Cart'
import { AddItemDto } from '../dto/AddItemDto'
import { UpdateItemDto } from '../dto/UpdateItemDto'

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createCart(): Cart {
    return this.cartService.createCart()
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getCart(@Param('id') cartId: string): Cart {
    return this.cartService.findCartById(cartId)
  }

  @Post(':id/items')
  @HttpCode(HttpStatus.OK)
  addItemToCart(@Param('id') cartId: string, @Body() addItemDto: AddItemDto): Cart {
    return this.cartService.addItemToCart(cartId, addItemDto.productId, addItemDto.quantity || 1)
  }

  @Put(':id/items/:productId')
  @HttpCode(HttpStatus.OK)
  updateCartItem(
    @Param('id') cartId: string,
    @Param('productId') productId: string,
    @Body() updateItemDto: UpdateItemDto,
  ): Cart {
    return this.cartService.updateCartItem(cartId, productId, updateItemDto.quantity)
  }

  @Delete(':id/items/:productId')
  @HttpCode(HttpStatus.OK)
  removeItemFromCart(@Param('id') cartId: string, @Param('productId') productId: string): Cart {
    return this.cartService.removeItemFromCart(cartId, productId)
  }

  @Delete(':id/items')
  @HttpCode(HttpStatus.OK)
  clearCart(@Param('id') cartId: string): Cart {
    return this.cartService.clearCart(cartId)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteCart(@Param('id') cartId: string): void {
    this.cartService.deleteCart(cartId)
  }
}
