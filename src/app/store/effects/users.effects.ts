import { Injectable } from '@angular/core';
import { ofType, Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/services';
import {
  DeleteUser,
  DeleteUserFail,
  DeleteUserSuccess,
  DELETE_USER,
  FetchUser,
  FetchUserFail,
  FetchUserSuccess,
  FETCH_USER,
  RegisterUser,
  RegisterUserFail,
  RegisterUserSuccess,
  REGISTER_USER,
  UpdateUser,
  UpdateUserFail,
  UpdateUserSuccess,
  UPDATE_USER,
} from '../actions';

@Injectable()
export class UsersEffects {
  constructor(private action$: Actions, private userService: UserService) {}

  @Effect()
  fetchUser$ = this.action$.pipe(
    ofType(FETCH_USER),
    switchMap((action: FetchUser) =>
      this.userService.getById(action.payload).pipe(
        mergeMap(user => [new FetchUserSuccess(user)]),
        catchError(error => of(new FetchUserFail(action.payload, error)))
      )
    )
  );

  @Effect()
  registerUser$ = this.action$.pipe(
    ofType(REGISTER_USER),
    switchMap((action: RegisterUser) =>
      this.userService
        .register(action.payload.email, action.payload.nickname, action.payload.password, action.payload.firstname, action.payload.lastname)
        .pipe(
          mergeMap(user => [new RegisterUserSuccess()]),
          catchError(error => of(new RegisterUserFail(error)))
        )
    )
  );

  @Effect()
  updateUser$ = this.action$.pipe(
    ofType(UPDATE_USER),
    switchMap((action: UpdateUser) =>
      this.userService.update(action.payload.id, action.payload.nickname).pipe(
        mergeMap(user => [new UpdateUserSuccess(user)]),
        catchError(error => of(new UpdateUserFail(action.payload.id, error)))
      )
    )
  );

  @Effect()
  deleteUser$ = this.action$.pipe(
    ofType(DELETE_USER),
    switchMap((action: DeleteUser) =>
      this.userService.delete(action.payload.id).pipe(
        mergeMap(() => [new DeleteUserSuccess(action.payload.id)]),
        catchError(error => of(new DeleteUserFail(action.payload.id, error)))
      )
    )
  );
}
