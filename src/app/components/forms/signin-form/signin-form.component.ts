import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
})
export class SigninFormComponent {
  user: {
    email: string;
    password: string;
  };

  @Input()
  loading = false;

  @Output()
  submit = new EventEmitter<{
    email: string;
    password: string;
  }>();

  constructor() {
    this.user = {
      email: '',
      password: '',
    };
  }

  onSubmit() {
    const { email, password } = this.user;
    this.submit.emit({
      email,
      password,
    });
  }
}
