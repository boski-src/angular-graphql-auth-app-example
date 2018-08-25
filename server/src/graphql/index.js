import { SubscriptionServer } from 'subscriptions-transport-ws'
import { execute, subscribe } from 'graphql'

import schema from './schema'
import { decodeToken } from '../utils'

const graphql = (server) => {
  new SubscriptionServer({
    schema,
    execute,
    subscribe,
    onConnect: (connectionParams) => {
      let token = connectionParams.Authorization
      if (!token) throw new Error('Auth token no exists!');
      let user = decodeToken(token)
      if (!user) throw new Error('Auth token is invalid!');

      return { user }
    }
  }, {
    server,
    path: '/subscriptions'
  })
}

export default graphql