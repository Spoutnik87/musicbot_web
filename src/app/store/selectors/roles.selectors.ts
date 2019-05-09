import { createSelector } from '@ngrx/store';
import { IAppState } from '../reducers';
import * as fromRoles from '../reducers/roles.reducer';

export const getRolesState = (state: IAppState) => state.roles;

export const getRoles = createSelector(
  getRolesState,
  fromRoles.getRoles
);

export const getRolesLoading = createSelector(
  getRolesState,
  fromRoles.getRolesLoading
);

export const getRolesLoaded = createSelector(
  getRolesState,
  fromRoles.getRolesLoaded
);

export const getRoleState = createSelector(
  getRolesState,
  (rolesState: fromRoles.IRolesState, props: { id: number }) => rolesState.entities[props.id]
);

export const getRole = createSelector(
  getRoleState,
  (roleState: fromRoles.IRoleState) => (roleState ? roleState.role : undefined)
);

export const getRoleLoading = createSelector(
  getRoleState,
  (roleState: fromRoles.IRoleState) => (roleState ? roleState.loading : undefined)
);

export const getRoleLoaded = createSelector(
  getRoleState,
  (roleState: fromRoles.IRoleState) => (roleState ? roleState.loaded : undefined)
);
