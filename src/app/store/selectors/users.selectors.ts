import { createSelector } from '@ngrx/store';
import { IAppState } from '../reducers';
import * as fromUsers from '../reducers/users.reducer';

export const getUsersState = (state: IAppState) => state.users;

export const getUsers = createSelector(
  getUsersState,
  fromUsers.getUsers
);

export const getUsersLoading = createSelector(
  getUsersState,
  fromUsers.getUsersLoading
);

export const getUsersLoaded = createSelector(
  getUsersState,
  fromUsers.getUsersLoaded
);

export const getUserState = createSelector(
  getUsersState,
  (usersState: fromUsers.IUsersState, props: { id: number }) => usersState.entities[props.id]
);

export const getAuthenticatedUserState = createSelector(
  getUsersState,
  (usersState: fromUsers.IUsersState) => usersState.entities[usersState.authenticatedUserId]
);

export const getAuthenticatedUser = createSelector(
  getAuthenticatedUserState,
  userState => (userState != null ? userState.user : undefined)
);

export const getAuthenticatedUserLoading = createSelector(
  getAuthenticatedUserState,
  userState => (userState != null ? userState.loading : undefined)
);

export const getAuthenticatedUserLoaded = createSelector(
  getAuthenticatedUserState,
  userState => (userState != null ? userState.loaded : undefined)
);

export const getAuthenticatedUserUpdatedAt = createSelector(
  getAuthenticatedUserState,
  userState => (userState != null ? userState.updatedAt : undefined)
);

export const getUser = createSelector(
  getUserState,
  (userState: fromUsers.IUserState) => (userState ? userState.user : undefined)
);

export const getUserLoading = createSelector(
  getUserState,
  (userState: fromUsers.IUserState) => (userState ? userState.loading : undefined)
);

export const getUserLoaded = createSelector(
  getUserState,
  (userState: fromUsers.IUserState) => (userState ? userState.loaded : undefined)
);

export const getUserUpdating = createSelector(
  getUserState,
  (userState: fromUsers.IUserState) => (userState ? userState.updating : undefined)
);

export const getUserUpdated = createSelector(
  getUserState,
  (userState: fromUsers.IUserState) => (userState ? userState.updated : undefined)
);
