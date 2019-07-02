import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-multi-state-input',
  templateUrl: './toggle-multi-state-input.component.html',
  styleUrls: ['./toggle-multi-state-input.component.css'],
})
export class ToggleMultiStateInputComponent {
  @Input()
  name = '';

  @Input()
  label = '';

  @Input()
  disabled = false;

  value = 0;

  @Output()
  change = new EventEmitter();

  onChange(event) {
    if (this.disabled) {
      return;
    }
    switch (event.srcElement.className) {
      case 'state1-container':
        this.value = -1;
        break;
      case 'state2-container':
        this.value = 0;
        break;
      case 'state3-container':
        this.value = 1;
    }
    this.change.emit(this.value);
  }
}
