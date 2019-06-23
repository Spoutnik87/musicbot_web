import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-input',
  templateUrl: './list-input.component.html',
  styleUrls: ['./list-input.component.css'],
})
export class ListInputComponent {
  @Input()
  name = '';

  @Input()
  label = '';

  @Output()
  change = new EventEmitter();
}
