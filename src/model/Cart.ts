import { Product } from "./Product"

export interface CartItem {
  productId: string
  quantity: number
  product: Product
}

export interface Cart {
  id: string
  items: CartItem[]
  total: number
  subtotal: number
}