export interface ILoginCredentials {
  email : string,
  password : string
}

export interface IRegisterCredentials {
  name : string,
  email : string,
  password : string
}

export interface IUserAuthData {
  _id : string,
  name : string,
  email : string,
  updatedAt : string,
  createdAt : string
}