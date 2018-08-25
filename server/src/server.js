import { createServer } from 'http'
import mongoose from './services/mongoose'

import express from './express'
import graphql from './graphql'

mongoose()
  .then(() => console.log('Connected to database'))
  .catch(err => console.log('Database error: %s', err))

const server = createServer(express())

graphql(server);

let port = process.env.PORT || 5000
server.listen(port, () => {
  console.log('Server running: http://0.0.0.0:%i', port)
})