import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
  FetchServers,
  FetchServersFail,
  FetchServersSuccess,
  FetchServerFail,
  FetchServerSuccess,
  FetchServerThumbnail,
  FetchServerThumbnailFail,
  FetchServerThumbnailSuccess,
  FETCH_SERVER,
  FETCH_SERVER_THUMBNAIL,
  FETCH_SERVERS,
  UpdateServer,
  UpdateServerFail,
  UpdateServerSuccess,
  UPDATE_SERVER,
} from '../actions';

@Injectable()
export class ServersEffects {
  constructor(private action$: Actions, private serverService: ServerService, private router: Router) {}

  @Effect()
  fetchServers$ = this.action$.pipe(
    ofType(FETCH_SERVERS),
    switchMap((action: FetchServers) =>
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
  fetchServerThumbnail$ = this.action$.pipe(
    ofType(FETCH_SERVER_THUMBNAIL),
    switchMap((action: FetchServerThumbnail) =>
      this.serverService.getThumbnail(action.payload).pipe(
        mergeMap(thumbnailURL => [new FetchServerThumbnailSuccess(action.payload, thumbnailURL)]),
        catchError(error => of(new FetchServerThumbnailFail(action.payload, error)))
      )
    )
  );

  @Effect()
  createServer$ = this.action$.pipe(
    ofType(CREATE_SERVER),
    switchMap((action: CreateServer) =>
      this.serverService.create(action.payload.name).pipe(
        mergeMap(server => {
          this.router.navigateByUrl('');
          return [new CreateServerSuccess(server)];
        }),
        catchError(error => of(new CreateServerFail(error)))
      )
    )
  );

  @Effect()
  updateServer$ = this.action$.pipe(
    ofType(UPDATE_SERVER),
    switchMap((action: UpdateServer) =>
      this.serverService.update(action.payload.id, action.payload.name).pipe(
        mergeMap(server => {
          this.router.navigateByUrl(`/manage-server/${server.id}`);
          return [new UpdateServerSuccess(server)];
        }),
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
