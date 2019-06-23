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

  radioValue = false;

  @Output()
  valueChange = new EventEmitter();

  @Input()
  set value(value) {
    this.radioValue = value;
    this.valueChange.emit(this.radioValue);
  }

  get value() {
    return this.radioValue;
  }
}
