import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAuthenticatedUserLoading, getMessages, IAppState, SigninUser } from 'src/app/store';
import { ClearMessages } from 'src/app/store/actions/messages.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
})
export class SigninComponent implements OnInit, OnDestroy {
  messages$ = this.store.select(getMessages);
  authenticatedUserLoading$ = this.store.select(getAuthenticatedUserLoading);

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.store.dispatch(new ClearMessages());
  }

  ngOnDestroy() {
    this.store.dispatch(new ClearMessages());
  }

  onSubmit(event: { email: string; password: string }) {
    const { email, password } = event;
    this.store.dispatch(new SigninUser(email, password));
  }
}
