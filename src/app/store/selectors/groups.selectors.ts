import { createSelector } from '@ngrx/store';
import { IAppState } from '../reducers';
import * as fromGroups from '../reducers/groups.reducer';

export const getGroupsState = (state: IAppState) => state.groups;

export const getGroups = createSelector(
  getGroupsState,
  fromGroups.getGroups
);

export const getGroupsLoading = createSelector(
  getGroupsState,
  fromGroups.getGroupsLoading
);

export const getGroupsLoaded = createSelector(
  getGroupsState,
  fromGroups.getGroupsLoaded
);

export const getGroupState = createSelector(
  getGroupsState,
  (groupsState: fromGroups.IGroupsState, props: { id: number }) => groupsState.entities[props.id]
);

export const getGroup = createSelector(
  getGroupState,
  (groupState: fromGroups.IGroupState) => (groupState ? groupState.group : undefined)
);

export const getGroupLoading = createSelector(
  getGroupState,
  (groupState: fromGroups.IGroupState) => (groupState ? groupState.loading : undefined)
);

export const getGroupLoaded = createSelector(
  getGroupState,
  (groupState: fromGroups.IGroupState) => (groupState ? groupState.loaded : undefined)
);

export const getGroupUpdating = createSelector(
  getGroupState,
  (groupState: fromGroups.IGroupState) => (groupState ? groupState.updating : undefined)
);

export const getGroupUpdated = createSelector(
  getGroupState,
  (groupState: fromGroups.IGroupState) => (groupState ? groupState.updated : undefined)
);
