import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { ServerModel } from '../../models/server.model';

export interface ServersState extends EntityState<ServerState, string> {}

export interface ServerState {
  id: string;
  server: ServerModel;
  loading: boolean;
  loaded: boolean;
  updating: boolean;
  updated: boolean;
  commandLoading: boolean;
  commandLoaded: boolean;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'servers' })
export class ServersStore extends EntityStore<ServersState, ServerState> {
  constructor() {
    super();
  }
}
