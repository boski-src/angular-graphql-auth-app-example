interface IAppConfig {
  name : string,
  graphql : {
    host : string,
    ssl : boolean,
    httpEndpoint : string,
    wsEndpoint : string
  }
}

export const AppConfig : IAppConfig = {
  name: 'client',
  graphql: {
    host: '127.0.0.1:5000',
    ssl: false,
    httpEndpoint: '/graphql',
    wsEndpoint: '/subscriptions'
  }
};