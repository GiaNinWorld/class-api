import { Field, Float, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ProductGql {
  @Field()
  id: string

  @Field()
  name: string

  @Field(() => Float)
  price: number

  @Field(() => Float, { nullable: true })
  originalPrice?: number

  @Field()
  description: string

  @Field()
  image: string

  @Field()
  category: string

  @Field()
  inStock: boolean
}
