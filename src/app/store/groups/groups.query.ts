import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { of, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GroupModel } from 'src/app/models/group.model';
import { ContentsQuery } from '../contents/contents.query';
import { ServersQuery } from '../servers/servers.query';
import { GroupsState, GroupsStore, GroupState } from './groups.store';

@Injectable({ providedIn: 'root' })
export class GroupsQuery extends QueryEntity<GroupsState, GroupState> {
  groups$ = this.selectAll().pipe(map(groupsState => groupsState.map(groupState => groupState.group)));

  constructor(protected store: GroupsStore, private serversQuery: ServersQuery, private contentsQuery: ContentsQuery) {
    super(store);
  }

  selectGroup(id: string): Observable<GroupModel> {
    return this.selectEntity(id).pipe(map(groupState => groupState.group));
  }

  selectByServer(serverId: string): Observable<GroupState[]> {
    return this.serversQuery.selectEntity(serverId).pipe(
      switchMap(serverState => {
        if (serverState != null && serverState.server != null) {
          return this.selectAll().pipe(
            map(groupsState =>
              groupsState.filter(groupState => groupState.group != null && groupState.group.serverId === serverState.server.id)
            )
          );
        } else {
          return of([]);
        }
      })
    );
  }

  selectGroupsByServer(serverId: string): Observable<GroupModel[]> {
    return this.selectByServer(serverId).pipe(map(groupsState => groupsState.map(groupState => groupState.group)));
  }

  /**
   * Select all groups that have access to a content.
   */
  selectByContent(contentId: string): Observable<GroupState[]> {
    return this.contentsQuery.selectEntity(contentId).pipe(
      switchMap(contentState => {
        if (contentState != null && contentState.content != null) {
          return this.selectAll().pipe(
            map(groupsState =>
              groupsState.filter(
                groupState => groupState.group != null && contentState.content.groups.find(it => it.id === groupState.group.id)
              )
            )
          );
        }
      })
    );
  }
}
