import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
})
export class CategoryFormComponent {
  @Input()
  loading = false;

  @Output()
  submit = new EventEmitter<{
    name: string;
  }>();

  @Output()
  cancel = new EventEmitter();

  category: {
    name: string;
  };

  constructor() {
    this.category = {
      name: '',
    };
  }

  onSubmit() {
    this.submit.emit({
      name: this.category.name,
    });
  }

  onCancel() {
    this.cancel.emit();
  }
}
