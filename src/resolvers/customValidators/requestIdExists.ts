import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";
import { userModel } from "../../models/user";

@ValidatorConstraint({ async: true })
class requestIdValidation implements ValidatorConstraintInterface {
  async validate(requestId: string) {
    let user = await userModel.findOne({ requestId })
    return Boolean(user)
  }
}

export default function requestIdExists(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: requestIdValidation
    });
  };
}