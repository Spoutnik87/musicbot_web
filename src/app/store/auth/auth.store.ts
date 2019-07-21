import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Role } from 'src/app/enums/Role';

export interface AuthState {
  id: string;
  email: string;
  token: string;
  role: Role;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<AuthState> {
  constructor() {
    super({});
  }
}
