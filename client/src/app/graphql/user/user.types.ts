export type UserQueryType = {
  userMe : UserType
}

export type UserMutationType = {
  userLogin : String,
  userRegister : UserType,
}

export type UserType = {
  _id : string,
  name : string,
  email : string,
  updatedAt : string,
  createdAt : string
}