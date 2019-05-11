import { createSelector } from '@ngrx/store';
import { IAppState } from '../reducers';
import * as fromContents from '../reducers/contents.reducer';

export const getContentsState = (state: IAppState) => state.contents;

export const getContents = createSelector(
  getContentsState,
  fromContents.getContents
);

export const getContentsLoading = createSelector(
  getContentsState,
  fromContents.getContentsLoading
);

export const getContentsLoaded = createSelector(
  getContentsState,
  fromContents.getContentsLoaded
);

export const getContentState = createSelector(
  getContentsState,
  (contentsState: fromContents.IContentsState, props: { id: number }) => contentsState.entities[props.id]
);

export const getContent = createSelector(
  getContentState,
  (contentState: fromContents.IContentState) => (contentState ? contentState.content : undefined)
);

export const getContentLoading = createSelector(
  getContentState,
  (contentState: fromContents.IContentState) => (contentState ? contentState.loading : undefined)
);

export const getContentLoaded = createSelector(
  getContentState,
  (contentState: fromContents.IContentState) => (contentState ? contentState.loaded : undefined)
);

export const getContentUpdating = createSelector(
  getContentState,
  (contentState: fromContents.IContentState) => (contentState ? contentState.updating : undefined)
);

export const getContentUpdated = createSelector(
  getContentState,
  (contentState: fromContents.IContentState) => (contentState ? contentState.updated : undefined)
);
