import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContentModel } from 'src/app/models/content.model';
import { ContentsState, ContentsStore, ContentState } from './contents.store';

@Injectable({ providedIn: 'root' })
export class ContentsQuery extends QueryEntity<ContentsState, ContentState> {
  contents$ = this.selectAll().pipe(map(contentsState => contentsState.map(contentState => contentState.content)));

  constructor(protected store: ContentsStore) {
    super(store);
  }

  selectContent(id: string): Observable<ContentModel> {
    return this.selectEntity(id).pipe(map(contentState => contentState.content));
  }

  selectByServer(serverId: string): Observable<ContentState[]> {
    return this.selectAll().pipe(
      map(contentsState => contentsState.filter(contentState => contentState.content != null && contentState.content.serverId === serverId))
    );
  }

  selectContentsByServer(serverId: string): Observable<ContentModel[]> {
    return this.selectByServer(serverId).pipe(map(contentsState => contentsState.map(contentState => contentState.content)));
  }
}
