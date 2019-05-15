import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';
import { ConfigService, ServerService } from 'src/app/services';
import { getServerState, FetchServer, IAppState } from 'src/app/store';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent {
  serverState$ = this.store.select(getServerState, { id: this.route.snapshot.paramMap.get('id') });

  serverLinkTokenLoading = false;

  serverLinkToken$ = of(null)
    .pipe(
      delay(0),
      switchMap(() => {
        this.serverLinkTokenLoading = true;
        return this.serverService.getServerLinkToken(this.route.snapshot.paramMap.get('id'));
      })
    )
    .pipe(
      map(token => {
        this.serverLinkTokenLoading = false;
        return token;
      })
    );

  constructor(
    private route: ActivatedRoute,
    private store: Store<IAppState>,
    private configService: ConfigService,
    private serverService: ServerService
  ) {
    this.store.dispatch(new FetchServer(this.route.snapshot.paramMap.get('id')));
  }
}
