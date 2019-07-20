import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Role } from 'src/app/enums/Role';
import { AuthState, AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState> {
  isAuthenticated$ = this.select(state => state != null);
  authenticatedUser$ = this.select(state => state);
  isLoggedIn$ = this.select(state => state.id != null);
  isAdmin$ = this.select(state => state.role != null && state.role === Role.ADMIN);
  isUser$ = this.select(state => state.role != null && state.role === Role.USER);

  constructor(protected store: AuthStore) {
    super(store);
  }
}
