import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { GroupModel } from 'src/app/models/group.model';

export interface GroupsState extends EntityState<GroupState, string> {}

export interface GroupState {
  id: string;
  group: GroupModel;
  loading: boolean;
  loaded: boolean;
  updating: boolean;
  updated: boolean;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'groups' })
export class GroupsStore extends EntityStore<GroupsState, GroupState> {
  constructor() {
    super();
  }
}
