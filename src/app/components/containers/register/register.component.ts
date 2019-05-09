import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MessageModel } from 'src/app/models/message.model';
import { getAuthenticatedUserLoading, getMessages, IAppState, RegisterUser } from 'src/app/store';
import { ClearMessages, SendErrorMessage } from 'src/app/store/actions/messages.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit, OnDestroy {
  messages$: Observable<MessageModel[]>;
  authenticatedUserLoading$: Observable<boolean>;

  constructor(private store: Store<IAppState>) {
    this.messages$ = this.store.select(getMessages);
    this.authenticatedUserLoading$ = this.store.select(getAuthenticatedUserLoading);
  }

  ngOnInit() {
    this.store.dispatch(new ClearMessages());
  }

  ngOnDestroy() {
    this.store.dispatch(new ClearMessages());
  }

  onSubmit(event: { email: string; nickname: string; password: string; confirmPassword: string; firstname: string; lastname: string }) {
    const { email, nickname, password, confirmPassword, firstname, lastname } = event;
    if (password === confirmPassword) {
      this.store.dispatch(new RegisterUser(email, nickname, password, firstname, lastname));
    } else {
      this.store.dispatch(new SendErrorMessage('Le mot de passe est invalide.'));
    }
  }
}
