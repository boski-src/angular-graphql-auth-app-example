import { Component } from '@angular/core';

import { AuthService } from '../core/services/auth';
import { UserService } from '../core/services/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor (public authService : AuthService, private userService : UserService) { }

  get user () {
    return this.userService.userData;
  }

}
