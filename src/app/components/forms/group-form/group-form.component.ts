import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faArrowAltCircleRight, faArrowCircleLeft, faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
})
export class GroupFormComponent {
  faArrowCircleLeft = faArrowCircleLeft;
  faArrowCircleRight = faArrowAltCircleRight;
  faSave = faSave;

  @Input()
  loading = false;

  @Output()
  submit = new EventEmitter<{
    name: string;
  }>();

  @Output()
  cancel = new EventEmitter();

  group: {
    name: string;
  };

  constructor() {
    this.group = {
      name: '',
    };
  }

  onSubmit() {
    this.submit.emit({
      name: this.group.name,
    });
  }

  onCancel() {
    this.cancel.emit();
  }
}
