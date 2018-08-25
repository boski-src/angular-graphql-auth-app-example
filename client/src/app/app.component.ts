import { Component } from '@angular/core';
import { AuthService } from './core/services/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor (private authService : AuthService) { }

  get logged () {
    return this.authService.isLogged;
  }

}
