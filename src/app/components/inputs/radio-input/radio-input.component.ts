import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-radio-input',
  templateUrl: './radio-input.component.html',
  styleUrls: ['./radio-input.component.css'],
})
export class RadioInputComponent {
  @Input()
  name = '';

  @Input()
  label = '';

  @Output()
  change = new EventEmitter();
}
