import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-radio-input',
  templateUrl: './radio-input.component.html',
  styleUrls: ['./radio-input.component.css'],
})
export class RadioInputComponent {
  @Input()
  name: string;

  @Input()
  item: string;

  @Input()
  label = '';

  @Input()
  value: string;

  @Output()
  valueChange = new EventEmitter();

  get radioValue() {
    return this.value;
  }

  set radioValue(value) {
    this.valueChange.emit(value);
  }
}
