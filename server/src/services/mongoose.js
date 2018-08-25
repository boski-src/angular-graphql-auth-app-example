import mongoose from 'mongoose'

import { cfg } from '../utils/index'

let db = cfg('database')
let uri = `mongodb://${db.username}:${db.password}@${db.hostname}:${db.port}/${db.database}`

export default () => mongoose.connect(uri, { useNewUrlParser: true })
