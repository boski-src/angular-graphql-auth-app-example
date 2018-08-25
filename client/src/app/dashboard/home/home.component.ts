import { Component, OnInit } from '@angular/core';
import { IUserAuthData } from '../../core/interfaces/user.interface';
import { UserService } from '../../core/services/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor (private userService : UserService) { }

  get user () : IUserAuthData {
    return this.userService.userData;
  }

  ngOnInit() {
  }

}
