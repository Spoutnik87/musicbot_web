import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getServers, FetchServers, IAppState } from 'src/app/store';

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
})
export class ServerListComponent {
  servers$ = this.store.select(getServers);

  constructor(private store: Store<IAppState>) {
    this.store.dispatch(new FetchServers());
  }
}
