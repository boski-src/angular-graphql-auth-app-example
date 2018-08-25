import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/internal/operators';

import { ILoginCredentials, IRegisterCredentials } from '../../interfaces/user.interface';
import { UserRepositoryService } from '../../repositories/user';
import { UserMutationType } from '../../../graphql/user';
import { TokenService } from '../token';

@Injectable()
export class AuthService {
  private isLoggedSubject : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLogged$ : Observable<boolean> = this.isLoggedSubject.asObservable();

  constructor (private tokenService : TokenService, private userRepository : UserRepositoryService, private router : Router) {
    if (this.tokenService.get())
      this.loginInstance(<string>this.tokenService.get());
  }

  get isLogged () : boolean {
    return this.isLoggedSubject.value;
  }

  public login (credentials) : void {
    this.auth(credentials)
      .subscribe(token => {
        this.loginInstance(token);
        this.router.navigate(['']);
      });
  }

  public register (credentials) : void {
    this.create(credentials)
      .subscribe(() => this.router.navigate(['auth', 'login']));
  }

  public logout () : void {
    this.logoutInstance();
    this.router.navigate(['auth', 'login']);
  }

  private loginInstance (token) {
    this.tokenService.set(token);
    this.isLoggedSubject.next(true);
  }

  private logoutInstance () {
    this.tokenService.remove();
    this.isLoggedSubject.next(false);
  }

  private auth (credentials : ILoginCredentials) : Observable<UserMutationType> {
    return this.userRepository.userLogin(credentials)
      .pipe(map(({ data }) => data.userLogin));
  }

  private create (credentials : IRegisterCredentials) : Observable<UserMutationType> {
    return this.userRepository.userRegister(credentials)
      .pipe(map(({ data }) => data.userRegister));
  }

}
