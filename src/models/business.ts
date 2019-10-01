import { ObjectType, Field, ID } from "type-graphql";
import { Typegoose, prop } from "@hasezoey/typegoose";
import { Address } from "./user";

@ObjectType()
class OperationHours {
  @prop()
  @Field()
  sunday: {
    open: string
    close: string
    spName: 'Domingo'
  }

  @prop()
  @Field()
  monday: {
    open: string
    close: string
    spName: 'Lunes'
  }

  @prop()
  @Field()
  tuesday: {
    open: string
    close: string
    spName: 'Martes'
  }

  @prop()
  @Field()
  wednesday: {
    open: string
    close: string
    spName: 'Miercoles'
  }

  @prop()
  @Field()
  thursday: {
    open: string
    close: string
    spName: 'Jueves'
  }

  @prop()
  @Field()
  friday: {
    open: string
    close: string
    spName: 'Viernes'
  }

  @prop()
  @Field()
  saturday: {
    open: string
    close: string
    spName: 'Sabado'
  }
}

@ObjectType()
export class Business extends Typegoose {
  @Field(() => ID)
  id: string
  
  @prop({ required: true })
  @Field({ nullable: false })
  owner!: string

  @Field()
  @prop()
  businessName!: string

  @Field({ nullable: false })
  @prop({ default: false })
  approved!: boolean

  @Field()
  @prop()
  address!: Address

  @Field()
  @prop()
  operationHours: OperationHours

  @Field()
  @prop()
  picture: string

}

export const businessModel = new Business()
  .getModelForClass(Business, { schemaOptions: { timestamps: true } })