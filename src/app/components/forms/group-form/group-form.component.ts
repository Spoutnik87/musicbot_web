import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
})
export class GroupFormComponent {
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
