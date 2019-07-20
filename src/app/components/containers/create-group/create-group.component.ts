import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupsService } from 'src/app/store/groups/groups.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
})
export class CreateGroupComponent {
  loading = false;

  serverId = this.route.snapshot.paramMap.get('id');

  constructor(private route: ActivatedRoute, private router: Router, private groupsService: GroupsService) {}

  onSubmit(event: { name: string }) {
    this.groupsService.create(this.serverId, event.name);
  }

  onCancel() {
    this.router.navigateByUrl(`/server/${this.serverId}`);
  }
}
