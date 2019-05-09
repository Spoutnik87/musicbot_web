import { Action } from '@ngrx/store';
import { UserModel } from '../../models/user.model';

export const CLEAR_USERS = 'CLEAR_USERS';
export const DISCONNECT_USER = 'DISCONNECT_USER';

export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL';

export const SIGNIN_USER = 'SIGNIN_USER';
export const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS';
export const SIGNIN_USER_FAIL = 'SIGNIN_USER_FAIL';

export const FETCH_AUTHENTICATED_USER = 'FETCH_AUTHENTICATED_USER';
export const FETCH_AUTHENTICATED_USER_SUCCESS = 'FETCH_AUTHENTICATED_USER_SUCCESS';
export const FETCH_AUTHENTICATED_USER_FAIL = 'FETCH_AUTHENTICATED_USER_FAIL';

export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAIL = 'FETCH_USER_FAIL';

export const ADD_USERS = 'ADD_USERS';
export const ADD_USER = 'ADD_USER';

export const USER_ALREADY_CACHED = 'USER_ALREADY_CACHED';
export const AUTHENTICATED_USER_ALREADY_CACHED = 'AUTHENTICATED_USER_ALREADY_CACHED';

export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';

export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAIL = 'DELETE_USER_FAIL';

export class ClearUsers implements Action {
  readonly type = CLEAR_USERS;
}

export class DisconnectUser implements Action {
  readonly type = DISCONNECT_USER;
}

export class RegisterUser implements Action {
  readonly type = REGISTER_USER;
  payload: {
    email: string;
    nickname: string;
    password: string;
    firstname: string;
    lastname: string;
  };

  constructor(email: string, nickname: string, password: string, firstname: string, lastname: string) {
    this.payload = {
      email,
      nickname,
      password,
      firstname,
      lastname,
    };
  }
}

export class RegisterUserSuccess implements Action {
  readonly type = REGISTER_USER_SUCCESS;
}

export class RegisterUserFail implements Action {
  readonly type = REGISTER_USER_FAIL;
  payload: any;

  constructor(error: any) {
    this.payload = error;
  }
}

export class SigninUser implements Action {
  readonly type = SIGNIN_USER;
  payload: {
    login: string;
    password: string;
  };

  constructor(login: string, password: string) {
    this.payload = {
      login,
      password,
    };
  }
}

export class SigninUserSuccess implements Action {
  readonly type = SIGNIN_USER_SUCCESS;
  payload: UserModel;

  constructor(user: UserModel) {
    this.payload = user;
  }
}

export class SigninUserFail implements Action {
  readonly type = SIGNIN_USER_FAIL;
  payload: any;

  constructor(error: any) {
    this.payload = error;
  }
}

export class FetchAuthenticatedUser implements Action {
  readonly type = FETCH_AUTHENTICATED_USER;
}

export class FetchAuthenticatedUserSuccess implements Action {
  readonly type = FETCH_AUTHENTICATED_USER_SUCCESS;
  payload: UserModel;

  constructor(user: UserModel) {
    this.payload = user;
  }
}

export class FetchAuthenticatedUserFail implements Action {
  readonly type = FETCH_AUTHENTICATED_USER_FAIL;
  payload: any;

  constructor(error: any) {
    this.payload = error;
  }
}

export class FetchUser implements Action {
  readonly type = FETCH_USER;
  payload: string;

  constructor(id: string) {
    this.payload = id;
  }
}

export class FetchUserSuccess implements Action {
  readonly type = FETCH_USER_SUCCESS;
  payload: UserModel;

  constructor(user: UserModel) {
    this.payload = user;
  }
}

export class FetchUserFail implements Action {
  readonly type = FETCH_USER_FAIL;
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

export class AddUsers implements Action {
  readonly type = ADD_USERS;
  payload: UserModel[];

  constructor(users: UserModel[]) {
    this.payload = users;
  }
}

export class AddUser implements Action {
  readonly type = ADD_USER;
  payload: UserModel;

  constructor(user: UserModel) {
    this.payload = user;
  }
}

export class UserAlreadyCached implements Action {
  readonly type = USER_ALREADY_CACHED;
  payload: string;

  constructor(id: string) {
    this.payload = id;
  }
}

export class AuthenticatedUserAlreadyCached implements Action {
  readonly type = AUTHENTICATED_USER_ALREADY_CACHED;
}

export class UpdateUser implements Action {
  readonly type = UPDATE_USER;
  payload: {
    id: string;
    nickname: string;
  };

  constructor(id: string, nickname: string) {
    this.payload = {
      id,
      nickname,
    };
  }
}

export class UpdateUserSuccess implements Action {
  readonly type = UPDATE_USER_SUCCESS;
  payload: UserModel;

  constructor(user: UserModel) {
    this.payload = user;
  }
}

export class UpdateUserFail implements Action {
  readonly type = UPDATE_USER_FAIL;
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

export class DeleteUser implements Action {
  readonly type = DELETE_USER;
  payload: {
    id: string;
    login: string;
  };

  constructor(id: string, login: string) {
    this.payload = {
      id,
      login,
    };
  }
}

export class DeleteUserSuccess implements Action {
  readonly type = DELETE_USER_SUCCESS;
  payload: {
    id: string;
  };

  constructor(id: string) {
    this.payload = {
      id,
    };
  }
}

export class DeleteUserFail implements Action {
  readonly type = DELETE_USER_FAIL;
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

export type UsersAction =
  | ClearUsers
  | DisconnectUser
  | RegisterUser
  | RegisterUserSuccess
  | RegisterUserFail
  | SigninUser
  | SigninUserSuccess
  | SigninUserFail
  | FetchAuthenticatedUser
  | FetchAuthenticatedUserSuccess
  | FetchAuthenticatedUserFail
  | FetchUser
  | FetchUserSuccess
  | FetchUserFail
  | AddUsers
  | AddUser
  | UserAlreadyCached
  | AuthenticatedUserAlreadyCached
  | UpdateUser
  | UpdateUserSuccess
  | UpdateUserFail
  | DeleteUser
  | DeleteUserSuccess
  | DeleteUserFail;
