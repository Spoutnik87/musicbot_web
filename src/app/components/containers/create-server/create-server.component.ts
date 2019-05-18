import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CreateServer, IAppState } from 'src/app/store';

@Component({
  selector: 'app-create-server',
  templateUrl: './create-server.component.html',
})
export class CreateServerComponent {
  loading = false;

  constructor(private store: Store<IAppState>, private router: Router) {}

  onSubmit(event: { name: string }) {
    this.store.dispatch(new CreateServer(event.name));
  }

  onCancel() {
    this.router.navigateByUrl('');
  }
}
