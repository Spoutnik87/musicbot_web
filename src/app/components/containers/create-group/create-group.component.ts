import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CreateGroup, IAppState } from 'src/app/store';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
})
export class CreateGroupComponent {
  loading = false;

  serverId = this.route.snapshot.paramMap.get('id');

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<IAppState>) {}

  onSubmit(event: { name: string }) {
    this.store.dispatch(new CreateGroup(this.serverId, event.name));
  }

  onCancel() {
    this.router.navigateByUrl(`/server/${this.serverId}`);
  }
}
