import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ofType, Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { iif, of } from 'rxjs';
import { catchError, first, mergeMap, switchMap } from 'rxjs/operators';
import { AuthService, UserService } from 'src/app/services';
import { isFetchRequired } from 'src/app/utils';
import {
  AuthenticatedUserAlreadyCached,
  DeleteUser,
  DeleteUserFail,
  DeleteUserSuccess,
  DELETE_USER,
  FetchAuthenticatedUser,
  FetchAuthenticatedUserFail,
  FetchAuthenticatedUserSuccess,
  FetchUser,
  FetchUserFail,
  FetchUserSuccess,
  FETCH_AUTHENTICATED_USER,
  FETCH_USER,
  RegisterUser,
  RegisterUserFail,
  RegisterUserSuccess,
  REGISTER_USER,
  SigninUser,
  SigninUserFail,
  SigninUserSuccess,
  SIGNIN_USER,
  UpdateUser,
  UpdateUserFail,
  UpdateUserSuccess,
  UPDATE_USER,
} from '../actions';
import { IAppState } from '../reducers';
import { getAuthenticatedUserUpdatedAt } from '../selectors';

@Injectable()
export class UsersEffects {
  constructor(
    private action$: Actions,
    private store: Store<IAppState>,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

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
  signinUser$ = this.action$.pipe(
    ofType(SIGNIN_USER),
    switchMap((action: SigninUser) =>
      this.userService.signIn(action.payload.email, action.payload.password).pipe(
        mergeMap(user => {
          this.authService.signIn(user);
          this.router.navigate(['/']);
          return [new SigninUserSuccess(user)];
        }),
        catchError(error => of(new SigninUserFail(error)))
      )
    )
  );

  @Effect()
  fetchAuthenticatedUser$ = this.action$.pipe(
    ofType(FETCH_AUTHENTICATED_USER),
    switchMap((action: FetchAuthenticatedUser) =>
      this.store.select(getAuthenticatedUserUpdatedAt).pipe(
        first(),
        isFetchRequired(),
        switchMap((doFetch: boolean) =>
          iif(
            () => doFetch,
            this.userService.getSession().pipe(
              mergeMap(user => [new FetchAuthenticatedUserSuccess(user)]),
              catchError(error => {
                this.authService.disconnect();
                return of(new FetchAuthenticatedUserFail(error));
              })
            ),
            of(new AuthenticatedUserAlreadyCached())
          )
        )
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
