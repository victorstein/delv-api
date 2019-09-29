import { ObjectType, Field, ID, Root } from 'type-graphql'
import { Typegoose, prop } from '@hasezoey/typegoose'

@ObjectType()
class Address {
  @prop({ default: 'Nicaragua' })
  @Field()
  country?: string
  
  @prop()
  @Field()
  addressLine1?: string
  
  @prop()
  @Field()
  addressLine2?: string
  
  @prop()
  @Field()
  houseNumber?: string
  
  @prop()
  @Field()
  city?: string
}

@ObjectType({ description: 'User model. The user may have one of 3 roles: admin, user, store' })
export class User extends Typegoose {
  @Field(() => ID)
  id: string
  
  @Field({ nullable: false })
  @prop({ required: true })
  firstName!: string

  @Field({ nullable: false })
  @prop({ required: true })
  lastName!: string

  @Field()
  fullName(@Root() parent: any): string {
    return `${parent.firstName} ${parent.lastName}`
  }

  @Field({ nullable: false })
  @prop({ required: true })
  phoneNumber!: string

  @prop()
  assignedToken?: string

  @Field({ nullable: false })
  @prop({ required: true, default: 'user' })
  role!: string

  @prop()
  @Field()
  photoURL?: string

  @Field()
  @prop()
  address?: Address

  @prop()
  validationId?: string
}

export const userModel = new User()
  .getModelForClass(User, { schemaOptions: { timestamps: true } })