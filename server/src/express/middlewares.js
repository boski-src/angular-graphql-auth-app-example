import { decodeToken } from '../utils/index'

const tokenDecode = async (req, res, next) => {
  let token = req.headers.authorization || req.query.token || ''
  if (token) {
    try {
      req.user = await decodeToken(token)
    } catch (e) {
      next({ status: 401, errors: ['Auth token is invalid.'] })
    }
  }
  next()
}

const sizeSecure = (req, res, next) => {
  let query = req.query.query || req.body.query || ''
  if (query.length > 2000) {
    next({ status: 400, errors: ['Query size is too large.'] })
  }
  next()
}

const errorHandler = (err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ errors: err.errors })
}

export {
  tokenDecode,
  sizeSecure,
  errorHandler
}