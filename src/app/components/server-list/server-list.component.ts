import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faGhost, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/store/auth/auth.service';
import { ServersQuery } from 'src/app/store/servers/servers.query';
import { ServersService } from 'src/app/store/servers/servers.service';

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.css'],
})
export class ServerListComponent {
  faPlusSquare = faPlusSquare;
  faGhost = faGhost;

  servers$ = this.serversQuery.servers$;
  serversLoading$ = this.serversQuery.selectLoading();

  constructor(
    private router: Router,
    private serversService: ServersService,
    private serversQuery: ServersQuery,
    private authService: AuthService
  ) {
    this.serversService.getByUser(this.authService.getId());
  }

  onSelect(id: string) {
    this.router.navigateByUrl(`/server/${id}`);
  }

  onManage(id: string) {
    this.router.navigateByUrl(`/manage-server/${id}`);
  }
}
