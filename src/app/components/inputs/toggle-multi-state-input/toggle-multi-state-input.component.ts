import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-multi-state-input',
  templateUrl: './toggle-multi-state-input.component.html',
  styleUrls: ['./toggle-multi-state-input.component.css'],
})
export class ToggleMultiStateInputComponent implements OnInit {
  @Input()
  name = '';

  @Input()
  label = '';

  value = 0;

  @Output()
  change = new EventEmitter();

  ngOnInit() {}

  onChange(event) {
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
  }
}
