import { Injectable } from '@angular/core';
import { ofType, Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { CategoryService } from 'src/app/services';
import {
  CategoriesAction,
  CreateCategory,
  CreateCategoryFail,
  CreateCategorySuccess,
  CREATE_CATEGORY,
  DeleteCategory,
  DeleteCategoryFail,
  DeleteCategorySuccess,
  DELETE_CATEGORY,
  FetchCategoriesFail,
  FetchCategoriesSuccess,
  FetchCategory,
  FetchCategoryFail,
  FetchCategorySuccess,
  FETCH_CATEGORIES,
  FETCH_CATEGORY,
  UpdateCategory,
  UpdateCategoryFail,
  UpdateCategorySuccess,
  UPDATE_CATEGORY,
} from '../actions';

@Injectable()
export class CategoriesEffects {
  constructor(private action$: Actions, private categoryService: CategoryService) {}

  @Effect()
  fetchCategories$ = this.action$.pipe(
    ofType(FETCH_CATEGORIES),
    switchMap((action: CategoriesAction) =>
      this.categoryService.getAll().pipe(
        mergeMap(categories => [new FetchCategoriesSuccess(categories)]),
        catchError(error => of(new FetchCategoriesFail(error)))
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
        mergeMap(category => [new CreateCategorySuccess(category)]),
        catchError(error => of(new CreateCategoryFail(error)))
      )
    )
  );

  @Effect()
  updateCategory$ = this.action$.pipe(
    ofType(UPDATE_CATEGORY),
    switchMap((action: UpdateCategory) =>
      this.categoryService.update(action.payload.id, action.payload.serverId, action.payload.name).pipe(
        mergeMap(category => [new UpdateCategorySuccess(category)]),
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
