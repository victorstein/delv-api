import { Field, ArgsType } from 'type-graphql'
import { IsPhoneNumber } from 'class-validator'

@ArgsType()
export default class signUpInterface {
  @Field({ nullable: false })
  @IsPhoneNumber('NI', { message: 'Por favor ingrese un numero de telefono valido.' })
  phoneNumber!: string
}