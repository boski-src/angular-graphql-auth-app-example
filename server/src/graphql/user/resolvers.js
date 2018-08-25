import User from '../../models/User'
import constants from '../constants'

export default {
  [constants.USER_LOGIN]: (parent, { email, password }) => {
    return new Promise((resolve, reject) => {
      User.findOne({ email })
        .then(user => user ? user : reject('Account isn\'t exists in database.'))
        .then(user => user.comparePassword(password) ? user : reject('Email or password is incorrect.'))
        .then(user => resolve(user.renderJWT()))
        .catch(err => reject(err))
    })
  },
  [constants.USER_REGISTER]: (parent, args) => {
    return new Promise((resolve, reject) => {
      new User(args)
        .save()
        .then(user => resolve(user))
        .catch(err => reject(err))
    })
  },
  [constants.USER_ME]: (parent, args, { user }) => {
    return new Promise((resolve, reject) => {
      User.findById(user.id)
        .then(user => resolve(user))
        .catch(err => reject(err))
    })
  }
}