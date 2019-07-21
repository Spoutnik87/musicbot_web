import { Component } from '@angular/core';
import { AuthQuery } from './store/auth/auth.query';
import { AuthService } from './store/auth/auth.service';
import { UsersQuery } from './store/users/users.query';
import { UsersService } from './store/users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isAuthenticated$ = this.authQuery.isAuthenticated$;
  authenticatedUserLoading$ = this.usersQuery.authenticatedUserLoading$;

  constructor(
    private authService: AuthService,
    private authQuery: AuthQuery,
    private usersService: UsersService,
    private usersQuery: UsersQuery
  ) {
    if (this.authService.isAuthenticated()) {
      this.usersService.getAuthenticatedUser();
    }
  }
}
