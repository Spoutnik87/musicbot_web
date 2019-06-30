import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { CLEAR_STORE, StoreAction } from '../actions';
import {
  ADD_CATEGORIES,
  ADD_CATEGORY,
  CategoriesAction,
  CLEAR_CATEGORIES,
  CREATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_SUCCESS,
  FETCH_CATEGORY,
  FETCH_CATEGORY_FAIL,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_THUMBNAIL_SUCCESS,
  FETCH_SERVER_CATEGORIES,
  FETCH_SERVER_CATEGORIES_FAIL,
  FETCH_SERVER_CATEGORIES_SUCCESS,
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_SUCCESS,
} from '../actions/categories.actions';
import { CategoryModel } from './../../models/category.model';

export interface ICategoriesState extends EntityState<ICategoryState> {
  loading: boolean;
  loaded: boolean;
}
export interface ICategoryState {
  category: CategoryModel;
  loading: boolean;
  loaded: boolean;
  updating: boolean;
  updated: boolean;
}

export const categoriesAdapter: EntityAdapter<ICategoryState> = createEntityAdapter<ICategoryState>({
  selectId: categoryState => categoryState.category.id,
});

const initialState: ICategoriesState = categoriesAdapter.getInitialState({
  loading: false,
  loaded: false,
});

export function categoriesReducer(state = initialState, action: CategoriesAction | StoreAction): ICategoriesState {
  switch (action.type) {
    case FETCH_SERVER_CATEGORIES:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case FETCH_SERVER_CATEGORIES_SUCCESS:
      return {
        ...categoriesAdapter.addAll(
          action.payload.categories.map(category => ({
            category,
            loading: false,
            loaded: true,
            updating: false,
            updated: false,
          })),
          state
        ),
        loading: false,
        loaded: true,
      };
    case FETCH_SERVER_CATEGORIES_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    case FETCH_CATEGORY:
      return categoriesAdapter.upsertOne(
        {
          category: {
            ...(state.entities[action.payload] && state.entities[action.payload].category),
            id: action.payload,
          },
          loading: true,
          loaded: false,
          updating: false,
          updated: false,
        },
        state
      );
    case FETCH_CATEGORY_SUCCESS:
      return categoriesAdapter.upsertOne(
        {
          ...state.entities[action.payload.id],
          category: {
            ...(state.entities[action.payload.id] && state.entities[action.payload.id].category),
            ...action.payload,
          },
          loading: false,
          loaded: true,
        },
        state
      );
    case FETCH_CATEGORY_FAIL:
      return categoriesAdapter.upsertOne(
        {
          ...state.entities[action.payload.id],
          loading: false,
          loaded: false,
        },
        state
      );
    case CREATE_CATEGORY_SUCCESS:
      return categoriesAdapter.upsertOne(
        {
          category: action.payload.category,
          loading: false,
          loaded: true,
          updating: false,
          updated: false,
        },
        state
      );
    case UPDATE_CATEGORY:
      return categoriesAdapter.upsertOne(
        {
          ...state.entities[action.payload.id],
          updating: true,
          updated: false,
        },
        state
      );
    case UPDATE_CATEGORY_SUCCESS:
      return categoriesAdapter.upsertOne(
        {
          ...state.entities[action.payload.id],
          category: action.payload,
          updating: false,
          updated: true,
        },
        state
      );
    case UPDATE_CATEGORY_FAIL:
      return categoriesAdapter.upsertOne(
        {
          ...state.entities[action.payload.id],
          updating: false,
          updated: false,
        },
        state
      );
    case DELETE_CATEGORY_SUCCESS:
      return categoriesAdapter.removeOne(action.payload.id, state);
    case FETCH_CATEGORY_THUMBNAIL_SUCCESS:
      return categoriesAdapter.upsertOne(
        {
          ...state.entities[action.payload.id],
          category: {
            ...(state.entities[action.payload.id] && state.entities[action.payload.id].category),
            id: action.payload.id,
            thumbnailURL: action.payload.thumbnailURL,
          },
        },
        state
      );
    case ADD_CATEGORIES:
      return categoriesAdapter.upsertMany(
        action.payload.map(category => ({
          category,
          loading: false,
          loaded: true,
          updating: false,
          updated: false,
        })),
        state
      );
    case ADD_CATEGORY:
      return categoriesAdapter.upsertOne(
        {
          category: action.payload,
          loading: false,
          loaded: true,
          updating: false,
          updated: false,
        },
        state
      );
    case CLEAR_STORE:
    case CLEAR_CATEGORIES:
      return categoriesAdapter.removeAll(state);
    default:
      return state;
  }
}

export const getCategories = (state: ICategoriesState) =>
  categoriesAdapter
    .getSelectors()
    .selectAll(state)
    .map(categoryState => categoryState.category);
export const getCategoriesLoading = (state: ICategoriesState) => state.loading;
export const getCategoriesLoaded = (state: ICategoriesState) => state.loaded;
