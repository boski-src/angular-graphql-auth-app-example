import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {

  constructor (private formGroup : FormBuilder, private authService : AuthService) {}

  formData : FormGroup = this.formGroup.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required, Validators.minLength(3)]],
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
      name: '',
      password: ''
    });
  }

  public submit () {
    if (!this.formValid) return false;
    this.authService.register(this.formValue);
  }

}
