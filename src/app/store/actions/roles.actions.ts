import { Action } from '@ngrx/store';
import { RoleModel } from 'src/app/models/role.model';

export const CLEAR_ROLES = 'CLEAR_ROLES';

export const FETCH_ROLES = 'FETCH_ROLES';
export const FETCH_ROLES_SUCCESS = 'FETCH_ROLES_SUCCESS';
export const FETCH_ROLES_FAIL = 'FETCH_ROLES_FAIL';

export const FETCH_ROLE = 'FETCH_ROLE';
export const FETCH_ROLE_SUCCESS = 'FETCH_ROLE_SUCCESS';
export const FETCH_ROLE_FAIL = 'FETCH_ROLE_FAIL';

export const ADD_ROLES = 'ADD_ROLES';
export const ADD_ROLE = 'ADD_ROLE';

export class ClearRoles implements Action {
  readonly type = CLEAR_ROLES;
}

export class FetchRoles implements Action {
  readonly type = FETCH_ROLES;
}

export class FetchRolesSuccess implements Action {
  readonly type = FETCH_ROLES_SUCCESS;
  payload: RoleModel[];

  constructor(roles: RoleModel[]) {
    this.payload = roles;
  }
}

export class FetchRolesFail implements Action {
  readonly type = FETCH_ROLES_FAIL;
  payload: any;

  constructor(error: any) {
    this.payload = error;
  }
}

export class FetchRole implements Action {
  readonly type = FETCH_ROLE;
  payload: string;

  constructor(id: string) {
    this.payload = id;
  }
}

export class FetchRoleSuccess implements Action {
  readonly type = FETCH_ROLE_SUCCESS;
  payload: RoleModel;

  constructor(role: RoleModel) {
    this.payload = role;
  }
}

export class FetchRoleFail implements Action {
  readonly type = FETCH_ROLE_FAIL;
  payload: {
    id: string;
    error: any;
  };

  constructor(id: string, error: any) {
    this.payload = {
      id,
      error,
    };
  }
}

export class AddRoles implements Action {
  readonly type = ADD_ROLES;
  payload: RoleModel[];

  constructor(roles: RoleModel[]) {
    this.payload = roles;
  }
}

export class AddRole implements Action {
  readonly type = ADD_ROLE;
  payload: RoleModel;

  constructor(role: RoleModel) {
    this.payload = role;
  }
}

export type RolesAction =
  | ClearRoles
  | FetchRoles
  | FetchRolesSuccess
  | FetchRolesFail
  | FetchRole
  | FetchRoleSuccess
  | FetchRoleFail
  | AddRoles
  | AddRole;
