import { PubSub, withFilter as filter } from 'graphql-subscriptions'

const pubsub = new PubSub()
const withFilter = filter

export { pubsub, withFilter }
