import { GraphQLObjectType, GraphQLSchema } from 'graphql'

import User from './user'

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...User.Queries
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...User.Mutations
  }
})

// const Subscription = new GraphQLObjectType({
//   name: 'Subscription',
//   fields: {
//
//   }
// })

export default new GraphQLSchema({
  query: Query,
  mutation: Mutation,
  //subscription: Subscription
})