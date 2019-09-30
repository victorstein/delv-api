import { ArgsType, Field } from "type-graphql";
import phoneNumberShouldExist from "../customValidators/phoneNumberShouldExist";
import { IsPhoneNumber, Length } from "class-validator";
import phoneNumberShouldNotExist from "../customValidators/phoneNumberShouldNotExist";
import requestIdExists from "../customValidators/requestIdExists";

@ArgsType()
export class loginInterface {
  @Field({ nullable: false })
  @IsPhoneNumber('NI', { message: 'Por favor ingrese un numero de telefono valido.' })
  @phoneNumberShouldExist({ message: 'El numero de telefono no esta registrado. Por favor crea una cuenta nueva' })
  phoneNumber: string
}

@ArgsType()
export class requestPinInterface {
  @Field({ nullable: false })
  @IsPhoneNumber('NI', { message: 'Por favor ingrese un numero de telefono valido.' })
  @phoneNumberShouldNotExist({ message: 'El numero de telefono ya se encuentra registrado. Por favor inicie sesion.' })
  phoneNumber!: string

  @Field({ nullable: false })
  firstName!: string

  @Field({ nullable: false })
  lastName!: string
}

@ArgsType()
export class verifyPinInterface {
  @Field({ nullable: false })
  @Length(6, undefined, { message: 'El codigo de verificacion debe contener 6 digitos' })
  code!: string

  @Field({ nullable: false })
  @requestIdExists({ message: 'El codigo de identificacion no es invalido' })
  requestId!: string
}