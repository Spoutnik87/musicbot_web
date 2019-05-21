import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { CLEAR_STORE, StoreAction } from '../actions';
import {
  ADD_CONTENT,
  ADD_CONTENTS,
  ContentsAction,
  CLEAR_CONTENTS,
  CREATE_CONTENT_SUCCESS,
  DELETE_CONTENT_SUCCESS,
  FETCH_CONTENT,
  FETCH_CONTENT_FAIL,
  FETCH_CONTENT_SUCCESS,
  FETCH_CONTENT_THUMBNAIL_SUCCESS,
  FETCH_SERVER_CONTENTS,
  FETCH_SERVER_CONTENTS_FAIL,
  FETCH_SERVER_CONTENTS_SUCCESS,
  UPDATE_CONTENT,
  UPDATE_CONTENT_FAIL,
  UPDATE_CONTENT_SUCCESS,
} from '../actions/contents.actions';
import { ContentModel } from './../../models/content.model';

export interface IContentsState extends EntityState<IContentState> {
  loading: boolean;
  loaded: boolean;
}
export interface IContentState {
  content: ContentModel;
  loading: boolean;
  loaded: boolean;
  updating: boolean;
  updated: boolean;
}

export const contentsAdapter: EntityAdapter<IContentState> = createEntityAdapter<IContentState>({
  selectId: contentState => contentState.content.id,
});

const initialState: IContentsState = contentsAdapter.getInitialState({
  loading: false,
  loaded: false,
});

export function contentsReducer(state = initialState, action: ContentsAction | StoreAction): IContentsState {
  switch (action.type) {
    case FETCH_SERVER_CONTENTS:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case FETCH_SERVER_CONTENTS_SUCCESS:
      return {
        ...contentsAdapter.addAll(
          action.payload.contents.map(content => ({
            content,
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
    case FETCH_SERVER_CONTENTS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    case FETCH_CONTENT:
      return contentsAdapter.upsertOne(
        {
          content: {
            ...(state.entities[action.payload] && state.entities[action.payload].content),
            id: action.payload,
          },
          loading: true,
          loaded: false,
          updating: false,
          updated: false,
        },
        state
      );
    case FETCH_CONTENT_SUCCESS:
      return contentsAdapter.upsertOne(
        {
          ...state.entities[action.payload.id],
          content: action.payload,
          loading: false,
          loaded: true,
        },
        state
      );
    case FETCH_CONTENT_FAIL:
      return contentsAdapter.upsertOne(
        {
          ...state.entities[action.payload.id],
          loading: false,
          loaded: false,
        },
        state
      );
    case CREATE_CONTENT_SUCCESS:
      return contentsAdapter.upsertOne(
        {
          content: action.payload.content,
          loading: false,
          loaded: true,
          updating: false,
          updated: false,
        },
        state
      );
    case UPDATE_CONTENT:
      return contentsAdapter.upsertOne(
        {
          ...state.entities[action.payload.id],
          updating: true,
          updated: false,
        },
        state
      );
    case UPDATE_CONTENT_SUCCESS:
      return contentsAdapter.upsertOne(
        {
          ...state.entities[action.payload.id],
          content: action.payload,
          updating: false,
          updated: true,
        },
        state
      );
    case UPDATE_CONTENT_FAIL:
      return contentsAdapter.upsertOne(
        {
          ...state.entities[action.payload.id],
          updating: false,
          updated: false,
        },
        state
      );
    case DELETE_CONTENT_SUCCESS:
      return contentsAdapter.removeOne(action.payload.id, state);
    case FETCH_CONTENT_THUMBNAIL_SUCCESS:
      return contentsAdapter.upsertOne(
        {
          ...state.entities[action.payload.id],
          content: {
            ...(state.entities[action.payload.id] && state.entities[action.payload.id].content),
            id: action.payload.id,
            thumbnailURL: action.payload.thumbnailURL,
          },
        },
        state
      );
    case ADD_CONTENTS:
      return contentsAdapter.upsertMany(
        action.payload.map(content => ({
          content,
          loading: false,
          loaded: true,
          updating: false,
          updated: false,
        })),
        state
      );
    case ADD_CONTENT:
      return contentsAdapter.upsertOne(
        {
          content: action.payload,
          loading: false,
          loaded: true,
          updating: false,
          updated: false,
        },
        state
      );
    case CLEAR_STORE:
    case CLEAR_CONTENTS:
      return contentsAdapter.removeAll(state);
    default:
      return state;
  }
}

export const getContents = (state: IContentsState) =>
  contentsAdapter
    .getSelectors()
    .selectAll(state)
    .map(contentState => contentState.content);
export const getContentsLoading = (state: IContentsState) => state.loading;
export const getContentsLoaded = (state: IContentsState) => state.loaded;
