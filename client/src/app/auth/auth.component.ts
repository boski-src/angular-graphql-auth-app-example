import { Component } from '@angular/core';

import { AuthService } from '../core/services/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  constructor (private authService : AuthService) {
    this.authService.logout();
  }

}
