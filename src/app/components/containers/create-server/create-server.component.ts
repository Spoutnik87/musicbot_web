import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServersService } from 'src/app/store/servers/servers.service';

@Component({
  selector: 'app-create-server',
  templateUrl: './create-server.component.html',
})
export class CreateServerComponent {
  loading = false;

  constructor(private router: Router, private serversService: ServersService) {}

  onSubmit(event: { name: string }) {
    this.serversService.create(event.name).subscribe(
      serverId => {
        this.router.navigateByUrl('/server/' + serverId);
      },
      () => {}
    );
  }

  onCancel() {
    this.router.navigateByUrl('');
  }
}
