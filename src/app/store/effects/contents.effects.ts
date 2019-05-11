import { Injectable } from '@angular/core';
import { ofType, Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ContentService } from 'src/app/services';
import {
  ContentsAction,
  CreateContent,
  CreateContentFail,
  CreateContentSuccess,
  CREATE_CONTENT,
  DeleteContent,
  DeleteContentFail,
  DeleteContentSuccess,
  DELETE_CONTENT,
  FetchContent,
  FetchContentsFail,
  FetchContentsSuccess,
  FetchContentFail,
  FetchContentSuccess,
  FETCH_CONTENT,
  FETCH_CONTENTS,
  UpdateContent,
  UpdateContentFail,
  UpdateContentSuccess,
  UPDATE_CONTENT,
} from '../actions';

@Injectable()
export class ContentsEffects {
  constructor(private action$: Actions, private contentService: ContentService) {}

  @Effect()
  fetchContents$ = this.action$.pipe(
    ofType(FETCH_CONTENTS),
    switchMap((action: ContentsAction) =>
      this.contentService.getAll().pipe(
        mergeMap(contents => [new FetchContentsSuccess(contents)]),
        catchError(error => of(new FetchContentsFail(error)))
      )
    )
  );

  @Effect()
  fetchContent$ = this.action$.pipe(
    ofType(FETCH_CONTENT),
    switchMap((action: FetchContent) =>
      this.contentService.getById(action.payload).pipe(
        mergeMap(content => [new FetchContentSuccess(content)]),
        catchError(error => of(new FetchContentFail(action.payload, error)))
      )
    )
  );

  @Effect()
  createContent$ = this.action$.pipe(
    ofType(CREATE_CONTENT),
    switchMap((action: CreateContent) =>
      this.contentService.create(action.payload.groupId, action.payload.name, action.payload.categoryId, action.payload.contentTypeId).pipe(
        mergeMap(content => [new CreateContentSuccess(content)]),
        catchError(error => of(new CreateContentFail(error)))
      )
    )
  );

  @Effect()
  updateContent$ = this.action$.pipe(
    ofType(UPDATE_CONTENT),
    switchMap((action: UpdateContent) =>
      this.contentService
        .update(action.payload.id, action.payload.groupId, action.payload.name, action.payload.categoryId, action.payload.contentTypeId)
        .pipe(
          mergeMap(content => [new UpdateContentSuccess(content)]),
          catchError(error => of(new UpdateContentFail(action.payload.id, error)))
        )
    )
  );

  @Effect()
  deleteContent$ = this.action$.pipe(
    ofType(DELETE_CONTENT),
    switchMap((action: DeleteContent) =>
      this.contentService.delete(action.payload.id).pipe(
        mergeMap(() => [new DeleteContentSuccess(action.payload.id)]),
        catchError(error => of(new DeleteContentFail(action.payload.id, error)))
      )
    )
  );
}
