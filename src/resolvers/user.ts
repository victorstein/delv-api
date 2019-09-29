import { Resolver, Query, Mutation, Args } from "type-graphql";
import signUpInterface from "./Interfaces/signUpInterface";
import { ApolloError } from "apollo-server-core";
import Nexmo from "../utils/nexmo";

@Resolver()
export default class UserResolver {
  @Query(() => String)
  hello () {
    return 'hello world'
  }

  @Mutation(() => String)
  async requestPin (
    @Args() { phoneNumber }: signUpInterface
  ): Promise<String> {
    try {
      // request a pin with nexmo
      let { request_id } = await Nexmo.requestPIN(phoneNumber)

      return request_id
    } catch (e) {
      console.log(e)
      throw new ApolloError(e)
    }
  }
}
