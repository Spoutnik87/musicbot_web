import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './services';
import { getAuthenticatedUserLoading, FetchAuthenticatedUser, IAppState } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isAuthenticated$ = this.authService.isAuthenticated$;
  authenticatedUserLoading$ = this.store.select(getAuthenticatedUserLoading);

  constructor(private authService: AuthService, private store: Store<IAppState>) {
    if (this.authService.isAuthenticated()) {
      this.store.dispatch(new FetchAuthenticatedUser());
    }
  }
}
