import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { IUserAuthData } from '../../interfaces/user.interface';
import { UserRepositoryService } from '../../repositories/user';
import { AuthService } from '../auth';
import { TokenService } from '../token';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userDataSubject : BehaviorSubject<IUserAuthData> = new BehaviorSubject<IUserAuthData>({} as IUserAuthData);

  constructor (private authSerivce : AuthService, private tokenService : TokenService, private userRepository : UserRepositoryService) {
    this.authSerivce.isLogged$.subscribe((value) => {
      if (this.tokenService.get() && value === true) this.updateUserData();
      else this.resetUserData();
    });
  }

  get userData () : IUserAuthData {
    return this.userDataSubject.value;
  }

  public resetUserData () {
    this.userDataSubject.next({} as IUserAuthData);
  }

  public updateUserData () {
    this.userRepository.userMe()
      .subscribe(({ data }) => this.userDataSubject.next(<IUserAuthData>data.userMe));
  }
}
