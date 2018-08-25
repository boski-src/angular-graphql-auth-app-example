import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor (private formGroup : FormBuilder, private authService : AuthService) {}

  formData : FormGroup = this.formGroup.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  get formValue () {
    return this.formData.value;
  }

  get formValid () {
    return this.formData.valid;
  }

  public reset () {
    this.formData.reset({
      email: '',
      password: ''
    });
  }

  public submit () {
    if (!this.formValid) return false;
    this.authService.login(this.formValue);
  }

}
