import { Injectable } from '@angular/core';

import { FetchResult } from 'apollo-link';
import { Observable } from 'rxjs/Observable';

import { ILoginCredentials, IRegisterCredentials } from '../../interfaces/user.interface';
import { UserMutations, UserQueries, UserQueryType, UserType } from '../../../graphql/user';
import { RepositoryService } from '../repository.service';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {

  constructor (private client : RepositoryService) { }

  public userLogin (credentials : ILoginCredentials) : Observable<FetchResult<string>> {
    return this.client.mutate(UserMutations.userLogin, credentials);
  }

  public userRegister (details : IRegisterCredentials) : Observable<FetchResult<UserType>> {
    return this.client.mutate(UserMutations.userRegister, details);
  }

  public userMe () : Observable<FetchResult<UserQueryType>> {
    return this.client.query(UserQueries.userMe);
  }

}
