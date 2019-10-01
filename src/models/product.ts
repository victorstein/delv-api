import { ObjectType, Field, ID } from "type-graphql";
import { Typegoose, prop } from "@hasezoey/typegoose";

@ObjectType()
export class Product extends Typegoose {
  @Field(() => ID)
  id: string

  @prop({ required: true })
  @Field({ nullable: false, description: 'This field contains the id of the business it belongs to' })
  owner: string

  @prop({ required: true })
  @Field({ nullable: false })
  name: string

  @prop()
  @Field()
  picture: string

  @prop({ required: true })
  @Field({ nullable: false })
  price: number

  @prop()
  @Field()
  description: string

  @prop({ default: true })
  @Field()
  available: true
}

export const productModel = new Product()
  .getModelForClass(Product, { schemaOptions: { timestamps: true } })