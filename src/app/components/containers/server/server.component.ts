import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { of } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';
import { ServerStatusHelper } from 'src/app/helpers/server-status.helper';
import { ServerStatusModel } from 'src/app/models/server-status.model';
import { ConfigService } from 'src/app/services';
import { ContentsQuery } from 'src/app/store/contents/contents.query';
import { ContentsService } from 'src/app/store/contents/contents.service';
import { ServersQuery } from 'src/app/store/servers/servers.query';
import { ServersService } from 'src/app/store/servers/servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent {
  faSync = faSync;

  serverId = this.route.snapshot.paramMap.get('id');
  serverState$ = this.serversQuery.selectEntity(this.serverId);

  serverLinkTokenLoading = false;

  serverLinkToken$ = of(null)
    .pipe(
      delay(0),
      switchMap(() => {
        this.serverLinkTokenLoading = true;
        return this.serversService.getServerLinkToken(this.serverId);
      })
    )
    .pipe(
      map(token => {
        this.serverLinkTokenLoading = false;
        return token;
      })
    );

  contents$ = this.contentsQuery.selectContentsByServer(this.serverId);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public configService: ConfigService,
    private serverStatusHelper: ServerStatusHelper,
    private serversService: ServersService,
    private serversQuery: ServersQuery,
    private contentsService: ContentsService,
    private contentsQuery: ContentsQuery
  ) {
    this.serversService.getById(this.serverId);
    this.contentsService.getByServer(this.serverId);
  }

  refresh() {
    this.serversService.getById(this.serverId);
  }

  onShow(event: { id: string; status: ServerStatusModel }) {
    this.router.navigateByUrl('content/' + event.id);
  }

  onPlay(event: { id: string; status: ServerStatusModel }) {
    this.serversService.sendPlayContentCommand(this.serverId, event.id);
    this.serverStatusHelper.playContent(this.serverId, event.status, event.id);
  }
}
