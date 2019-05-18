import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ServerModel } from 'src/app/models/server.model';
import { IAppState } from 'src/app/store';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
})
export class ContentListComponent {
  @Input()
  server: ServerModel;

  constructor(private store: Store<IAppState>, private router: Router) {}

  onCreateContent() {
    this.router.navigateByUrl(`/create-content/${this.server.id}`);
  }
}
