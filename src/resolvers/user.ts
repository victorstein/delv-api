import { Resolver, Query, Args, Mutation } from "type-graphql";
import {
  requestPinInterface,
  verifyPinInterface,
  loginInterface
} from "./Interfaces/userInterfaces";
import { AuthenticationError } from "apollo-server-core";
import Nexmo from "../utils/nexmo";
import jwt from "jsonwebtoken"
import 'dotenv/config'
import { userModel, User } from "../models/user";

const { TOKEN_SECRET } = process.env

@Resolver()
export default class UserResolver {

  @Mutation(() => User)
  async signUp (
    @Args() { phoneNumber, firstName, lastName }: requestPinInterface
  ): Promise<User> {
    try {
      // request a pin with nexmo
      let { request_id } = await Nexmo.requestPIN(phoneNumber)

      // save the user to the database
      return userModel.create({
        firstName,
        lastName,
        phoneNumber,
        requestId: request_id
      })
    } catch (e) {
      console.log(e)
      throw new AuthenticationError(e)
    }
  }

  @Query(() => User)
  async login (
    @Args() { phoneNumber }: loginInterface
  ): Promise<User> {
    try {
      // request a pin with nexmo
      let { request_id } = await Nexmo.requestPIN(phoneNumber)

      // save the user to the database
      let user = await userModel.findOneAndUpdate({ phoneNumber }, {
        requestId: request_id
      }, { new: true })

      // return user
      return user!
    } catch (e) {
      console.log(e)
      throw new AuthenticationError(e)
    }
  }

  @Query(() => String)
  async verifyPin (
    @Args() { code, requestId }: verifyPinInterface
  ) {
    try {
      // Check the code validity
      const { request_id } = await Nexmo.verifyPin(requestId, code)

      // Create token
      const token = jwt.sign(request_id, TOKEN_SECRET!)

      // add token to the user user
      await userModel.findOneAndUpdate({ requestId }, { assignedToken: token })

      // If there are no errors proceed to return a token
      return token
    } catch (e) {
      console.log(e)
      throw new AuthenticationError(e)
    }
  }

}
