import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { cfg } from '../utils/index'

const Schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, unique: true, minLength: 3 },
  email: { type: String, required: true, unique: true },
  password: String
}, {
  timestamps: true
})

Schema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) this.password = await this.hashPassword()
  next()
})

Schema.methods = {
  hashPassword () {
    return bcrypt.hash(this.password, 12)
  },
  comparePassword (password) {
    return bcrypt.compareSync(password, this.password)
  },
  renderJWT () {
    return jwt.sign({
      id: this._id,
      name: this.name,
      email: this.email
    }, cfg('certs', false).key, { expiresIn: cfg('options').jwtExpire })
  }
}

export default mongoose.model('User', Schema)