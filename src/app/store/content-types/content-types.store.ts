import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { ContentTypeModel } from 'src/app/models/content-type.model';

export interface ContentTypesState extends EntityState<ContentTypeState, string> {}

export interface ContentTypeState {
  id: string;
  contentType: ContentTypeModel;
  loading: boolean;
  loaded: boolean;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'contentTypes' })
export class ContentTypesStore extends EntityStore<ContentTypesState, ContentTypeState> {
  constructor() {
    super();
  }
}
