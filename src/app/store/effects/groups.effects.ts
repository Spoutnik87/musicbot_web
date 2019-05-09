import { Injectable } from '@angular/core';
import { ofType, Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { GroupService } from 'src/app/services';
import {
  CreateGroup,
  CreateGroupFail,
  CreateGroupSuccess,
  CREATE_GROUP,
  DeleteGroup,
  DeleteGroupFail,
  DeleteGroupSuccess,
  DELETE_GROUP,
  FetchGroup,
  FetchGroupsFail,
  FetchGroupsSuccess,
  FetchGroupFail,
  FetchGroupSuccess,
  FETCH_GROUP,
  FETCH_GROUPS,
  GroupsAction,
  UpdateGroup,
  UpdateGroupFail,
  UpdateGroupSuccess,
  UPDATE_GROUP,
} from '../actions';

@Injectable()
export class GroupsEffects {
  constructor(private action$: Actions, private groupService: GroupService) {}

  @Effect()
  fetchGroups$ = this.action$.pipe(
    ofType(FETCH_GROUPS),
    switchMap((action: GroupsAction) =>
      this.groupService.getAll().pipe(
        mergeMap(groups => [new FetchGroupsSuccess(groups)]),
        catchError(error => of(new FetchGroupsFail(error)))
      )
    )
  );

  @Effect()
  fetchGroup$ = this.action$.pipe(
    ofType(FETCH_GROUP),
    switchMap((action: FetchGroup) =>
      this.groupService.getById(action.payload).pipe(
        mergeMap(group => [new FetchGroupSuccess(group)]),
        catchError(error => of(new FetchGroupFail(action.payload, error)))
      )
    )
  );

  @Effect()
  createGroup$ = this.action$.pipe(
    ofType(CREATE_GROUP),
    switchMap((action: CreateGroup) =>
      this.groupService.create(action.payload.serverId, action.payload.name).pipe(
        mergeMap(group => [new CreateGroupSuccess(group)]),
        catchError(error => of(new CreateGroupFail(error)))
      )
    )
  );

  @Effect()
  updateGroup$ = this.action$.pipe(
    ofType(UPDATE_GROUP),
    switchMap((action: UpdateGroup) =>
      this.groupService.update(action.payload.id, action.payload.serverId, action.payload.name).pipe(
        mergeMap(group => [new UpdateGroupSuccess(group)]),
        catchError(error => of(new UpdateGroupFail(action.payload.id, error)))
      )
    )
  );

  @Effect()
  deleteGroup$ = this.action$.pipe(
    ofType(DELETE_GROUP),
    switchMap((action: DeleteGroup) =>
      this.groupService.delete(action.payload.id).pipe(
        mergeMap(() => [new DeleteGroupSuccess(action.payload.id)]),
        catchError(error => of(new DeleteGroupFail(action.payload.id, error)))
      )
    )
  );
}
