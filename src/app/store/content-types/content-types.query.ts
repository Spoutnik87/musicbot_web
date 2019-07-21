import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { map } from 'rxjs/operators';
import { ContentTypesState, ContentTypesStore, ContentTypeState } from './content-types.store';

@Injectable({ providedIn: 'root' })
export class ContentTypesQuery extends QueryEntity<ContentTypesState, ContentTypeState> {
  contentTypes$ = this.selectAll().pipe(map(contentTypesState => contentTypesState.map(contentTypeState => contentTypeState.contentType)));

  constructor(protected store: ContentTypesStore) {
    super(store);
  }

  selectContentType(id: string) {
    return this.selectEntity(id).pipe(map(contentTypeState => contentTypeState.contentType));
  }
}
