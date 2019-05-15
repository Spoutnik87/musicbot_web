import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CreateServer, IAppState } from 'src/app/store';

@Component({
  selector: 'app-create-server',
  templateUrl: './create-server.component.html',
})
export class CreateServerComponent {
  loading = false;

  constructor(private store: Store<IAppState>) {}

  onSubmit(event: { name: string }) {
    this.store.dispatch(new CreateServer(event.name));
  }
}
