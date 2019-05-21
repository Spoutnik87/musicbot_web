import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';
import { ServerStatusHelper } from 'src/app/helpers/server-status.helper';
import { ServerStatusModel } from 'src/app/models/server-status.model';
import { ServerService } from 'src/app/services';
import { getServerContents, getServerState, FetchServer, FetchServerContents, IAppState, PlayContentCommand } from 'src/app/store';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent {
  serverId = this.route.snapshot.paramMap.get('id');
  serverState$ = this.store.select(getServerState, { id: this.serverId });

  serverLinkTokenLoading = false;

  serverLinkToken$ = of(null)
    .pipe(
      delay(0),
      switchMap(() => {
        this.serverLinkTokenLoading = true;
        return this.serverService.getServerLinkToken(this.serverId);
      })
    )
    .pipe(
      map(token => {
        this.serverLinkTokenLoading = false;
        return token;
      })
    );

  contents$ = this.store.select(getServerContents, { serverId: this.serverId });

  constructor(
    private route: ActivatedRoute,
    private store: Store<IAppState>,
    private serverService: ServerService,
    private serverStatusHelper: ServerStatusHelper
  ) {
    this.store.dispatch(new FetchServer(this.serverId));
    this.store.dispatch(new FetchServerContents(this.serverId));
  }

  refresh() {
    this.store.dispatch(new FetchServer(this.serverId));
  }

  onShow(event: { id: string; status: ServerStatusModel }) {}

  onPlay(event: { id: string; status: ServerStatusModel }) {
    this.store.dispatch(new PlayContentCommand(this.serverId, event.id));
    this.serverStatusHelper.playContent(this.serverId, event.status, event.id);
  }
}
