import { GraphQLNonNull, GraphQLString } from 'graphql'

import constants from '../constants'
import resolvers from './resolvers'
import { UserType } from './types'

export default {
  [constants.USER_LOGIN]: {
    type: GraphQLString,
    args: {
      email: { type: GraphQLNonNull(GraphQLString) },
      password: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: resolvers[constants.USER_LOGIN]
  },
  [constants.USER_REGISTER]: {
    type: UserType,
    args: {
      name: { type: GraphQLNonNull(GraphQLString) },
      email: { type: GraphQLNonNull(GraphQLString) },
      password: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: resolvers[constants.USER_REGISTER]
  }
}