import { createSelector } from '@ngrx/store';
import { IAppState } from '../reducers';
import * as fromServers from '../reducers/servers.reducer';

export const getServersState = (state: IAppState) => state.servers;

export const getServers = createSelector(
  getServersState,
  fromServers.getServers
);

export const getServersLoading = createSelector(
  getServersState,
  fromServers.getServersLoading
);

export const getServersLoaded = createSelector(
  getServersState,
  fromServers.getServersLoaded
);

export const getServerState = createSelector(
  getServersState,
  (serversState: fromServers.IServersState, props: { id: string }) => serversState.entities[props.id]
);

export const getServer = createSelector(
  getServerState,
  (serverState: fromServers.IServerState) => (serverState ? serverState.server : undefined)
);

export const getServerLoading = createSelector(
  getServerState,
  (serverState: fromServers.IServerState) => (serverState ? serverState.loading : undefined)
);

export const getServerLoaded = createSelector(
  getServerState,
  (serverState: fromServers.IServerState) => (serverState ? serverState.loaded : undefined)
);

export const getServerUpdating = createSelector(
  getServerState,
  (serverState: fromServers.IServerState) => (serverState ? serverState.updating : undefined)
);

export const getServerUpdated = createSelector(
  getServerState,
  (serverState: fromServers.IServerState) => (serverState ? serverState.updated : undefined)
);
