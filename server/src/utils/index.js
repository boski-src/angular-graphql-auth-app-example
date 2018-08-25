import jwt from 'jsonwebtoken'
import fs from 'fs'
import config from '../config'

export const cfg = (key, settings = true) => {
  if (settings) return config.settings[key]
  else return config[key]
}

export const decodeToken = (token) =>
  jwt.verify(token, cfg('certs', false).key)