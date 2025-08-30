import { Field, Float, ObjectType, Int } from '@nestjs/graphql'

@ObjectType()
export class CartItemGql {
  @Field()
  productId: string

  @Field(() => Int)
  quantity: number

  @Field(() => Float)
  price: number

  @Field()
  name: string

  @Field()
  image: string
}

@ObjectType()
export class CartGql {
  @Field()
  id: string

  @Field(() => [CartItemGql])
  items: CartItemGql[]

  @Field(() => Float)
  total: number

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}

