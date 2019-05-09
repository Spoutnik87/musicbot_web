import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageModel } from 'src/app/models/message.model';
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  user: {
    email: string;
    nickname: string;
    password: string;
    confirmPassword: string;
    firstname: string;
    lastname: string;
  };
  messages$: Observable<MessageModel[]>;
  authenticatedUserLoading$: Observable<boolean>;

  @Output()
  submit = new EventEmitter<{
    email: string;
    nickname: string;
    password: string;
    confirmPassword: string;
    firstname: string;
    lastname: string;
  }>();

  @Input()
  messages: MessageModel[];

  constructor() {
    this.user = {
      email: '',
      nickname: '',
      password: '',
      confirmPassword: '',
      firstname: '',
      lastname: '',
    };
  }

  onSubmit() {
    const { email, nickname, password, confirmPassword, firstname, lastname } = this.user;
    this.submit.emit({
      email,
      nickname,
      password,
      confirmPassword,
      firstname,
      lastname,
    });
  }
}
