import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ServerModel } from 'src/app/models/server.model';

@Component({
  selector: 'app-server-card',
  templateUrl: './server-card.component.html',
  styleUrls: ['./server-card.component.css'],
})
export class ServerCardComponent {
  @Input()
  server: ServerModel;

  @Output()
  select = new EventEmitter<string>();

  onSelect() {
    this.select.emit(this.server.id);
  }
}
