import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { ContentsQuery } from '../contents/contents.query';
import { ServersState, ServersStore, ServerState } from './servers.store';

@Injectable({ providedIn: 'root' })
export class ServersQuery extends QueryEntity<ServersState, ServerState> {
  servers$ = this.selectAll().pipe(map(serversState => serversState.map(serverState => serverState.server)));

  constructor(protected store: ServersStore, private contentsQuery: ContentsQuery) {
    super(store);
  }

  selectServer(id: string) {
    return this.selectEntity(id).pipe(map(serverState => serverState.server));
  }

  selectByContent(contentId: string) {
    return this.contentsQuery.selectEntity(contentId).pipe(
      filter(contentState => contentState != null && contentState.content != null),
      switchMap(contentState => {
        if (contentState != null && contentState.content != null) {
          return this.selectEntity(contentState.content.serverId);
        } else {
          return of(undefined);
        }
      })
    );
  }
}
