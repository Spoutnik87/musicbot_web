import { Injectable } from '@angular/core';
import { ofType, Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ServerService } from 'src/app/services';
import {
  CreateServer,
  CreateServerFail,
  CreateServerSuccess,
  CREATE_SERVER,
  DeleteServer,
  DeleteServerFail,
  DeleteServerSuccess,
  DELETE_SERVER,
  FetchServer,
  FetchServersFail,
  FetchServersSuccess,
  FetchServerFail,
  FetchServerSuccess,
  FETCH_SERVER,
  FETCH_SERVERS,
  ServersAction,
  UpdateServer,
  UpdateServerFail,
  UpdateServerSuccess,
  UPDATE_SERVER,
} from '../actions';

@Injectable()
export class ServersEffects {
  constructor(private action$: Actions, private serverService: ServerService) {}

  @Effect()
  fetchServers$ = this.action$.pipe(
    ofType(FETCH_SERVERS),
    switchMap((action: ServersAction) =>
      this.serverService.getAll().pipe(
        mergeMap(servers => [new FetchServersSuccess(servers)]),
        catchError(error => of(new FetchServersFail(error)))
      )
    )
  );

  @Effect()
  fetchServer$ = this.action$.pipe(
    ofType(FETCH_SERVER),
    switchMap((action: FetchServer) =>
      this.serverService.getById(action.payload).pipe(
        mergeMap(server => [new FetchServerSuccess(server)]),
        catchError(error => of(new FetchServerFail(action.payload, error)))
      )
    )
  );

  @Effect()
  createServer$ = this.action$.pipe(
    ofType(CREATE_SERVER),
    switchMap((action: CreateServer) =>
      this.serverService.create(action.payload.name).pipe(
        mergeMap(server => [new CreateServerSuccess(server)]),
        catchError(error => of(new CreateServerFail(error)))
      )
    )
  );

  @Effect()
  updateServer$ = this.action$.pipe(
    ofType(UPDATE_SERVER),
    switchMap((action: UpdateServer) =>
      this.serverService.update(action.payload.id, action.payload.name).pipe(
        mergeMap(server => [new UpdateServerSuccess(server)]),
        catchError(error => of(new UpdateServerFail(action.payload.id, error)))
      )
    )
  );

  @Effect()
  deleteServer$ = this.action$.pipe(
    ofType(DELETE_SERVER),
    switchMap((action: DeleteServer) =>
      this.serverService.delete(action.payload.id).pipe(
        mergeMap(() => [new DeleteServerSuccess(action.payload.id)]),
        catchError(error => of(new DeleteServerFail(action.payload.id, error)))
      )
    )
  );
}
