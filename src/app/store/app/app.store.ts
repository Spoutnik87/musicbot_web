import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'app' })
export class AppStore extends Store<{}> {
  constructor() {
    super({});
  }
}
