import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { AppStore } from './app.store';

@Injectable({ providedIn: 'root' })
export class AppQuery extends Query<{}> {
  constructor(protected store: AppStore) {
    super(store);
  }
}
