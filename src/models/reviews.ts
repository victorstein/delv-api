import { ObjectType, Field, ID } from "type-graphql";
import { Typegoose, prop } from "@hasezoey/typegoose";
import { Length } from "class-validator";

@ObjectType()
export class review extends Typegoose {
  @Field(() => ID)
  id: string
  
  @prop({ required: true })
  @Field({ nullable: false })
  owner: string

  @prop({ required: true })
  @Field({ nullable: false, description: 'This field contains the description of the review' })
  review: string

  @prop({ required: true })
  @Length(1, 5, { message: 'Las valoraciones pueden ser entre 1 y 5 estrellas' })
  @Field({ nullable: false })
  rating: number
}