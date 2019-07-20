import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { UserModel } from 'src/app/models/user.model';

export interface UsersState extends EntityState<UserState, string> {}

export interface UserState {
  id: string;
  user: UserModel;
  loading: boolean;
  loaded: boolean;
  updating: boolean;
  updated: boolean;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'users' })
export class UsersStore extends EntityStore<UsersState, UserState> {
  constructor() {
    super();
  }
}
