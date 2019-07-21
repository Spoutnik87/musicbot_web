import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { RoleModel } from 'src/app/models/role.model';

export interface RolesState extends EntityState<RoleState, string> {}

export interface RoleState {
  id: string;
  role: RoleModel;
  loading: boolean;
  loaded: boolean;
  updating: boolean;
  updated: boolean;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'roles' })
export class RolesStore extends EntityStore<RolesState, RoleState> {
  constructor() {
    super();
  }
}
