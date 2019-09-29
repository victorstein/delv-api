import { Resolver, Query } from "type-graphql";

@Resolver()
export default class UserResolver {
  @Query(() => String)
  hello () {
    return 'hello world'
  }
}
