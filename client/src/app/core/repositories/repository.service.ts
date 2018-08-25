import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor (public apollo : Apollo) { }

  public query (query, variables?) {
    return this.apollo.query({ query, variables });
  }

  public watchQuery (query, variables?) {
    return this.apollo.watchQuery({ query, variables })
      .valueChanges;
  }

  public mutate (mutation, variables?) {
    return this.apollo.mutate({ mutation, variables });
  }

}
