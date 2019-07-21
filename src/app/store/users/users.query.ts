import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { UsersState, UsersStore, UserState } from './users.store';

@Injectable({ providedIn: 'root' })
export class UsersQuery extends QueryEntity<UsersState, UserState> {
  users$ = this.selectAll().pipe(map(usersState => usersState.map(userState => userState.user)));
  authenticatedUserState$ = this.selectEntity(this.authService.getId());
  authenticatedUser$ = this.selectEntity(this.authService.getId()).pipe(map(userState => userState != null && userState.user));
  authenticatedUserLoading$ = this.selectEntity(this.authService.getId()).pipe(map(userState => userState != null && userState.loading));
  authenticatedUserLoaded$ = this.selectEntity(this.authService.getId()).pipe(map(userState => userState != null && userState.loaded));

  constructor(protected store: UsersStore, private authService: AuthService) {
    super(store);
  }

  selectUser(id: string) {
    return this.selectEntity(id).pipe(map(userState => userState.user));
  }
}
