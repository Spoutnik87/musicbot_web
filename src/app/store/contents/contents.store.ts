import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { ContentModel } from 'src/app/models/content.model';

export interface ContentsState extends EntityState<ContentState, string> {}

export interface ContentState {
  id: string;
  content: ContentModel;
  loading: boolean;
  loaded: boolean;
  updating: boolean;
  updated: boolean;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'contents' })
export class ContentsStore extends EntityStore<ContentsState, ContentState> {
  constructor() {
    super();
  }
}
