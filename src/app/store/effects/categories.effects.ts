import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ofType, Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { CategoryService } from 'src/app/services';
import {
  CreateCategory,
  CreateCategoryFail,
  CreateCategorySuccess,
  CREATE_CATEGORY,
  DeleteCategory,
  DeleteCategoryFail,
  DeleteCategorySuccess,
  DELETE_CATEGORY,
  FetchCategory,
  FetchCategoryFail,
  FetchCategorySuccess,
  FetchServerCategories,
  FetchServerCategoriesFail,
  FetchServerCategoriesSuccess,
  FETCH_CATEGORY,
  FETCH_SERVER_CATEGORIES,
  UpdateCategory,
  UpdateCategoryFail,
  UpdateCategorySuccess,
  UPDATE_CATEGORY,
} from '../actions';

@Injectable()
export class CategoriesEffects {
  constructor(private action$: Actions, private categoryService: CategoryService, private router: Router) {}

  @Effect()
  fetchServerCategories$ = this.action$.pipe(
    ofType(FETCH_SERVER_CATEGORIES),
    switchMap((action: FetchServerCategories) =>
      this.categoryService.getByServerId(action.payload).pipe(
        mergeMap(categories => [new FetchServerCategoriesSuccess(action.payload, categories)]),
        catchError(error => of(new FetchServerCategoriesFail(action.payload, error)))
      )
    )
  );

  @Effect()
  fetchCategory$ = this.action$.pipe(
    ofType(FETCH_CATEGORY),
    switchMap((action: FetchCategory) =>
      this.categoryService.getById(action.payload).pipe(
        mergeMap(category => [new FetchCategorySuccess(category)]),
        catchError(error => of(new FetchCategoryFail(action.payload, error)))
      )
    )
  );

  @Effect()
  createCategory$ = this.action$.pipe(
    ofType(CREATE_CATEGORY),
    switchMap((action: CreateCategory) =>
      this.categoryService.create(action.payload.serverId, action.payload.name).pipe(
        mergeMap(category => {
          this.router.navigateByUrl(`/server/${action.payload.serverId}`);
          return [new CreateCategorySuccess(category)];
        }),
        catchError(error => of(new CreateCategoryFail(error)))
      )
    )
  );

  @Effect()
  updateCategory$ = this.action$.pipe(
    ofType(UPDATE_CATEGORY),
    switchMap((action: UpdateCategory) =>
      this.categoryService.update(action.payload.id, action.payload.name).pipe(
        mergeMap(category => {
          this.router.navigateByUrl(`/manage-server/${category.serverId}`);
          return [new UpdateCategorySuccess(category)];
        }),
        catchError(error => of(new UpdateCategoryFail(action.payload.id, error)))
      )
    )
  );

  @Effect()
  deleteCategory$ = this.action$.pipe(
    ofType(DELETE_CATEGORY),
    switchMap((action: DeleteCategory) =>
      this.categoryService.delete(action.payload.id).pipe(
        mergeMap(() => [new DeleteCategorySuccess(action.payload.id)]),
        catchError(error => of(new DeleteCategoryFail(action.payload.id, error)))
      )
    )
  );
}
