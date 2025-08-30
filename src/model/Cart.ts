<<<<<<< HEAD
export interface CartItem {
  productId: string
  quantity: number
  price: number
  name: string
  image: string
=======
import { Product } from "./Product"

export interface CartItem {
  productId: string
  quantity: number
  product: Product
>>>>>>> 7ff75dddff1a1a3dfdb84b22479950667605fa24
}

export interface Cart {
  id: string
  items: CartItem[]
  total: number
<<<<<<< HEAD
  createdAt: Date
  updatedAt: Date
}

=======
  subtotal: number
}
>>>>>>> 7ff75dddff1a1a3dfdb84b22479950667605fa24
