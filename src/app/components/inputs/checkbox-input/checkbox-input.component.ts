import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox-input',
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.css'],
})
export class CheckboxInputComponent {
  @Input()
  name = '';

  @Input()
  label = '';

  @Output()
  change = new EventEmitter();
}
