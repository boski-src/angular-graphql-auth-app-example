import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';

import { getOperationAST } from 'graphql';
import { Apollo, ApolloModule } from 'apollo-angular';
import { setContext } from 'apollo-link-context';
import { ApolloLink, from } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink, HttpLinkHandler, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AppConfig } from '../app.config';
import { AuthService } from '../core/services/auth';
import { TokenService } from '../core/services/token';

@NgModule({
  imports: [
    CommonModule,
    ApolloModule,
    HttpLinkModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [Apollo]
})

export class GraphQLModule {
  constructor (private apollo : Apollo, private httpLink : HttpLink, private tokenService : TokenService, private authService : AuthService) {
    this.init();
  }

  public init () {
    this.apollo.create({
      link: this.setupMiddlewares().concat(this.link()),
      cache: this.cache(),
      defaultOptions: {
        watchQuery: {
          errorPolicy: 'all'
        }
      }
    });
  }

  private link () : ApolloLink {
    return ApolloLink.split(
      ({ query, operationName }) => {
        let operationAST = getOperationAST(query, operationName);
        return !!operationAST && operationAST.operation === 'subscription';
      },
      this.socket(),
      this.http()
    );
  }

  private http () : HttpLinkHandler {
    return this.httpLink.create({
      uri: `${AppConfig.graphql.ssl ? 'https' : 'http'}://${AppConfig.graphql.host}${AppConfig.graphql.httpEndpoint}`
    });
  }

  private socket () : WebSocketLink {
    return new WebSocketLink({
      uri: `${AppConfig.graphql.ssl ? 'wss' : 'ws'}://${AppConfig.graphql.host}${AppConfig.graphql.wsEndpoint}`,
      options: {
        reconnect: true
      }
    });
  }

  private cache () : InMemoryCache {
    return new InMemoryCache();
  }

  private setupMiddlewares () {
    const err = onError(({ networkError, graphQLErrors, response, operation }) => {
      //if (graphQLErrors) // todo send to logger alert service
      if (networkError) this.authService.logout();
    });
    const req = setContext(() => {
      if (this.tokenService.get())
        return {
          headers: new HttpHeaders().append('Authorization', this.tokenService.get())
        };
    });
    return from([err, req]);
  }
}
