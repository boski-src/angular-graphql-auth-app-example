import { isAuth } from '../middlewares'

import resolvers from './resolvers'
import constants from '../constants'
import { UserType } from './types'

export default {
  [constants.USER_ME]: {
    type: UserType,
    resolve: isAuth(resolvers[constants.USER_ME])
  }
}