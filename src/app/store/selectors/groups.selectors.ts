import { createSelector } from '@ngrx/store';
import { GroupModel } from 'src/app/models/group.model';
import { IAppState } from '../reducers';
import * as fromGroups from '../reducers/groups.reducer';

export const getGroupsState = (state: IAppState) => state.groups;

export const getGroups = createSelector(
  getGroupsState,
  fromGroups.getGroups
);

export const getServerGroups = createSelector(
  getGroups,
  (groups: GroupModel[], props: { serverId: string }) => groups.filter(group => group.serverId === props.serverId)
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
  (groupsState: fromGroups.IGroupsState, props: { id: string }) => groupsState.entities[props.id]
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
