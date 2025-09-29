import { CartGql } from '../model/CartGql'
import { CartService } from '../service/cart.service'
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'

@Resolver(() => CartGql)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Query(() => CartGql)
  cart(@Args('id', { type: () => String }) id: string) {
    return this.cartService.findCartById(id)
  }

  @Mutation(() => CartGql)
  createCart() {
    return this.cartService.createCart()
  }

  @Mutation(() => CartGql)
  addItemToCart(
    @Args('cartId', { type: () => String }) cartId: string,
    @Args('productId', { type: () => String }) productId: string,
    @Args('quantity', { type: () => Number, defaultValue: 1 }) quantity: number,
  ) {
    return this.cartService.addItemToCart(cartId, productId, quantity)
  }

  @Mutation(() => CartGql)
  updateCartItem(
    @Args('cartId', { type: () => String }) cartId: string,
    @Args('productId', { type: () => String }) productId: string,
    @Args('quantity', { type: () => Number }) quantity: number,
  ) {
    return this.cartService.updateCartItem(cartId, productId, quantity)
  }

  @Mutation(() => CartGql)
  removeItemFromCart(
    @Args('cartId', { type: () => String }) cartId: string,
    @Args('productId', { type: () => String }) productId: string,
  ) {
    return this.cartService.removeItemFromCart(cartId, productId)
  }

  @Mutation(() => CartGql)
  clearCart(@Args('cartId', { type: () => String }) cartId: string) {
    return this.cartService.clearCart(cartId)
  }

  @Mutation(() => Boolean)
  deleteCart(@Args('cartId', { type: () => String }) cartId: string) {
    this.cartService.deleteCart(cartId)
    return true
  }
}
