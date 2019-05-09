import { createSelector } from '@ngrx/store';
import { IAppState } from '../reducers';
import * as fromCategories from '../reducers/categories.reducer';

export const getCategoriesState = (state: IAppState) => state.categories;

export const getCategories = createSelector(
  getCategoriesState,
  fromCategories.getCategories
);

export const getCategoriesLoading = createSelector(
  getCategoriesState,
  fromCategories.getCategoriesLoading
);

export const getCategoriesLoaded = createSelector(
  getCategoriesState,
  fromCategories.getCategoriesLoaded
);

export const getCategoryState = createSelector(
  getCategoriesState,
  (categoriesState: fromCategories.ICategoriesState, props: { id: number }) => categoriesState.entities[props.id]
);

export const getCategory = createSelector(
  getCategoryState,
  (categoryState: fromCategories.ICategoryState) => (categoryState ? categoryState.category : undefined)
);

export const getCategoryLoading = createSelector(
  getCategoryState,
  (categoryState: fromCategories.ICategoryState) => (categoryState ? categoryState.loading : undefined)
);

export const getCategoryLoaded = createSelector(
  getCategoryState,
  (categoryState: fromCategories.ICategoryState) => (categoryState ? categoryState.loaded : undefined)
);

export const getCategoryUpdating = createSelector(
  getCategoryState,
  (categoryState: fromCategories.ICategoryState) => (categoryState ? categoryState.updating : undefined)
);

export const getCategoryUpdated = createSelector(
  getCategoryState,
  (categoryState: fromCategories.ICategoryState) => (categoryState ? categoryState.updated : undefined)
);
