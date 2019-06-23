import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { getServers, getServersLoading, FetchServers, IAppState } from 'src/app/store';

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
})
export class ServerListComponent {
  faPlusSquare = faPlusSquare;

  servers$ = this.store.select(getServers);
  serversLoading$ = this.store.select(getServersLoading);

  constructor(private store: Store<IAppState>, private router: Router) {
    this.store.dispatch(new FetchServers());
  }

  onSelect(id: string) {
    this.router.navigateByUrl(`/server/${id}`);
  }

  onManage(id: string) {
    this.router.navigateByUrl(`/manage-server/${id}`);
  }
}
