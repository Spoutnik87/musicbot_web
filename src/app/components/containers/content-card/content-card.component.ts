import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store';

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
})
export class ContentCardComponent {
  constructor(private store: Store<IAppState>) {}
}
