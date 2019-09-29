import { ObjectType, Field, ID, Root } from 'type-graphql'
import { Typegoose, prop } from '@hasezoey/typegoose'

class Address {
  @prop({ default: 'Nicaragua' })
  country: string
  addressLine1: string
  addressLine2: string
  houseNumber: string
  city: string
}

@ObjectType({ description: 'User model. The user may have one of 3 roles: admin, user, store' })
export class User extends Typegoose {
  @Field(() => ID)
  id: string
  
  @Field()
  @prop({ required: true })
  firstName!: string

  @Field()
  @prop({ required: true })
  lastName!: string

  @Field()
  fullName(@Root() parent: any): string {
    return `${parent.firstName} ${parent.lastName}`
  }

  @Field()
  @prop({ required: true, default: 'user' })
  role!: string

  @Field()
  @prop({ lowercase: true, required: true })
  email!: string
  
  @Field()
  @prop({ required: true })
  authProvider!: string

  @prop({ required: true })
  password!: string
  
  @prop()
  @Field()
  photoURL?: string

  @Field()
  @prop()
  address?: Address
}

export const userModel = new User()
  .getModelForClass(User, { schemaOptions: { timestamps: true } })