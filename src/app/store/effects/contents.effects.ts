import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ofType, Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ContentService } from 'src/app/services';
import {
  CreateContent,
  CreateContentFail,
  CreateContentSuccess,
  CREATE_CONTENT,
  DeleteContent,
  DeleteContentFail,
  DeleteContentSuccess,
  DELETE_CONTENT,
  FetchContent,
  FetchContentFail,
  FetchContentSuccess,
  FetchContentThumbnail,
  FetchContentThumbnailFail,
  FetchContentThumbnailSuccess,
  FetchGroup,
  FetchGroupThumbnail,
  FetchServer,
  FetchServerContents,
  FetchServerContentsFail,
  FetchServerContentsSuccess,
  FetchServerThumbnail,
  FETCH_CONTENT,
  FETCH_CONTENT_THUMBNAIL,
  FETCH_SERVER_CONTENTS,
  UpdateContent,
  UpdateContentFail,
  UpdateContentSuccess,
  UPDATE_CONTENT,
} from '../actions';
import { IAppState } from '../reducers';

@Injectable()
export class ContentsEffects {
  constructor(private action$: Actions, private contentService: ContentService, private router: Router, private store: Store<IAppState>) {}

  @Effect()
  fetchServerContents$ = this.action$.pipe(
    ofType(FETCH_SERVER_CONTENTS),
    switchMap((action: FetchServerContents) =>
      this.contentService.getByServerId(action.payload).pipe(
        mergeMap(contents => [new FetchServerContentsSuccess(action.payload, contents)]),
        catchError(error => of(new FetchServerContentsFail(action.payload, error)))
      )
    )
  );

  @Effect()
  fetchContent$ = this.action$.pipe(
    ofType(FETCH_CONTENT),
    switchMap((action: FetchContent) =>
      this.contentService.getById(action.payload.id).pipe(
        mergeMap(content => {
          if (action.payload.full) {
            this.store.dispatch(new FetchServer(content.serverId));
            this.store.dispatch(new FetchServerThumbnail(content.serverId));
            for (const group of content.groups) {
              this.store.dispatch(new FetchGroup(group.id));
              this.store.dispatch(new FetchGroupThumbnail(group.id));
            }
          }
          return [new FetchContentSuccess(content)];
        }),
        catchError(error => of(new FetchContentFail(action.payload.id, error)))
      )
    )
  );

  @Effect()
  fetchContentThumbnail$ = this.action$.pipe(
    ofType(FETCH_CONTENT_THUMBNAIL),
    switchMap((action: FetchContentThumbnail) =>
      this.contentService.getThumbnail(action.payload).pipe(
        mergeMap(thumbnailURL => [new FetchContentThumbnailSuccess(action.payload, thumbnailURL)]),
        catchError(error => of(new FetchContentThumbnailFail(action.payload, error)))
      )
    )
  );

  @Effect()
  createContent$ = this.action$.pipe(
    ofType(CREATE_CONTENT),
    switchMap((action: CreateContent) =>
      this.contentService
        .create(
          action.payload.visibleGroupList,
          action.payload.name,
          action.payload.description,
          action.payload.categoryId,
          action.payload.contentTypeId
        )
        .pipe(
          mergeMap(content => {
            this.router.navigateByUrl(`/server/${action.payload.serverId}`);
            return [new CreateContentSuccess(content)];
          }),
          catchError(error => of(new CreateContentFail(error)))
        )
    )
  );

  @Effect()
  updateContent$ = this.action$.pipe(
    ofType(UPDATE_CONTENT),
    switchMap((action: UpdateContent) =>
      this.contentService
        .update(
          action.payload.id,
          action.payload.visibleGroupList,
          action.payload.name,
          action.payload.description,
          action.payload.categoryId,
          action.payload.contentType
        )
        .pipe(
          mergeMap(content => {
            this.router.navigateByUrl(`/manage-server/${content.serverId}`);
            return [new UpdateContentSuccess(content)];
          }),
          catchError(error => of(new UpdateContentFail(action.payload.id, error)))
        )
    )
  );

  @Effect()
  deleteContent$ = this.action$.pipe(
    ofType(DELETE_CONTENT),
    switchMap((action: DeleteContent) =>
      this.contentService.delete(action.payload.id).pipe(
        mergeMap(() => {
          this.router.navigateByUrl('/');
          return [new DeleteContentSuccess(action.payload.id)];
        }),
        catchError(error => of(new DeleteContentFail(action.payload.id, error)))
      )
    )
  );
}
