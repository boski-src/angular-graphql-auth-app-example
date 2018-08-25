import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import { graphqlExpress } from 'apollo-server-express'
import expressPlayground from 'graphql-playground-middleware-express'

import { errorHandler, sizeSecure, tokenDecode } from './middlewares'
import schema from '../graphql/schema'

const expressApp = () => {
  const app = new express()

  app.disable('x-powered-by')
  app.disable('views')

  app.use(helmet())
  app.use(morgan('tiny'))
  app.use(cors('*'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(sizeSecure)

  app.use('/graphql', tokenDecode,
    graphqlExpress(({ user }) => ({
      schema,
      context: { user },
      formatError: err => err
    }))
  )

  if (process.env.NODE_ENV === 'development') {
    app.get('/playground',
      expressPlayground({
        endpoint: `http://0.0.0.0:${process.env.PORT || 5000}/graphql`,
        subscriptionsEndpoint: `http://0.0.0.0:${process.env.PORT || 5000}/subscriptions`
      })
    )
  }

  app.use(errorHandler)

  return app
}

export default expressApp