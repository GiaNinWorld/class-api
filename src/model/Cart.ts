export interface CartItem {
  productId: string
  quantity: number
  price: number
  name: string
  image: string
}

export interface Cart {
  id: string
  items: CartItem[]
  total: number
  createdAt: Date
  updatedAt: Date
}
