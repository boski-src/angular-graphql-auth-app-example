import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  public get = () : string =>
    localStorage.getItem('token');

  public set = (token) : void =>
    localStorage.setItem('token', token);

  public remove = () : void =>
    localStorage.removeItem('token');

}
