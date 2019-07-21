import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-input',
  templateUrl: './toggle-input.component.html',
  styleUrls: ['./toggle-input.component.css'],
})
export class ToggleInputComponent {
  @Input()
  name = '';

  @Input()
  label = '';

  @Input()
  value = false;

  @Input()
  disabled = false;

  @Output()
  valueChange = new EventEmitter();

  get toggleValue() {
    return this.value;
  }

  set toggleValue(value) {
    this.valueChange.emit(value);
  }
}
