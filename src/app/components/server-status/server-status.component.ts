import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { faPause, faPlay, faStepForward, faStop, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { interval, Subscription } from 'rxjs';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import { ServerStatusHelper } from 'src/app/helpers/server-status.helper';
import { ContentStatusModel } from 'src/app/models/content-status.model';
import { ServerModel } from 'src/app/models/server.model';
import { ConfigService } from 'src/app/services';
import { ServersService } from 'src/app/store/servers/servers.service';

export class Action {
  constructor(public type: 'CONNECT_PLAYER' | 'DISCONNECT_PLAYER' | 'GET_PLAYER_STATE') {}
}

export class JoinAction extends Action {
  constructor(public serverId: string) {
    super('CONNECT_PLAYER');
  }
}

export class LeaveAction extends Action {
  constructor(public serverId: string, public sessionId: string) {
    super('DISCONNECT_PLAYER');
  }
}

export class GetStateAction extends Action {
  constructor(public serverId: string) {
    super('GET_PLAYER_STATE');
  }
}

@Component({
  selector: 'app-server-status',
  templateUrl: './server-status.component.html',
  styleUrls: ['./server-status.component.css'],
})
export class ServerStatusComponent implements OnInit, OnDestroy {
  faPlay = faPlay;
  faPause = faPause;
  faStop = faStop;
  faStepForward = faStepForward;
  faWindowClose = faWindowClose;

  @Input()
  server: ServerModel;

  refreshSubscription: Subscription;

  private socket$: WebSocketSubject<Action>;

  constructor(
    private serverStatusHelper: ServerStatusHelper,
    private serversService: ServersService,
    private configService: ConfigService
  ) {
    this.socket$ = new WebSocketSubject('ws://' + this.configService.getDomain() + '/player');
    this.socket$.subscribe(
      message => {
        console.log(message);
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.serversService.getStatus(this.server.id);
    /*this.refreshSubscription = interval(10000).subscribe(() => {
      this.serversService.getStatus(this.server.id);
    });*/
  }

  ngOnDestroy() {
    if (this.refreshSubscription != null) {
      this.refreshSubscription.unsubscribe();
      this.refreshSubscription = null;
    }
  }

  onNext(contentId: string) {
    this.serverStatusHelper.playNextContent(this.server.id, this.server.status);
  }

  onResume() {
    this.serversService.sendResumeContentCommand(this.server.id);
    this.serverStatusHelper.resume(this.server.id, this.server.status);
  }

  onPause() {
    this.serversService.sendPauseContentCommand(this.server.id);
    this.serverStatusHelper.pause(this.server.id, this.server.status);
  }

  onStop(content: ContentStatusModel) {
    if (content == null) {
      return;
    }
    this.serversService.sendStopContentCommand(this.server.id, content.id, content.uid);
  }

  onClear() {
    this.serversService.sendClearQueueCommand(this.server.id);
    this.serverStatusHelper.clearQueue(this.server.id, this.server.status);
  }

  onSetPosition(event: { id: string; position: number }) {
    this.serversService.sendSetPositionCommand(this.server.id, event.id, event.position);
    this.serverStatusHelper.setPosition(this.server.id, this.server.status, event.position);
  }
}
