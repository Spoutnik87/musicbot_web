import { Injectable } from '@angular/core';
import { ofType, Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { RoleService } from 'src/app/services';
import {
  FetchRole,
  FetchRoles,
  FetchRolesFail,
  FetchRolesSuccess,
  FetchRoleFail,
  FetchRoleSuccess,
  FETCH_ROLE,
  FETCH_ROLES,
} from '../actions';

@Injectable()
export class RolesEffects {
  constructor(private action$: Actions, private roleService: RoleService) {}

  @Effect()
  fetchRoles$ = this.action$.pipe(
    ofType(FETCH_ROLES),
    switchMap((action: FetchRoles) =>
      this.roleService.getAll().pipe(
        mergeMap(roles => [new FetchRolesSuccess(roles)]),
        catchError(error => of(new FetchRolesFail(error)))
      )
    )
  );

  @Effect()
  fetchRole$ = this.action$.pipe(
    ofType(FETCH_ROLE),
    switchMap((action: FetchRole) =>
      this.roleService.getById(action.payload).pipe(
        mergeMap(role => [new FetchRoleSuccess(role)]),
        catchError(error => of(new FetchRoleFail(action.payload, error)))
      )
    )
  );
}
