import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
})
export class CategoryFormComponent implements OnInit {
  @Input()
  loading = false;

  @Input()
  category: CategoryModel = null;

  @Output()
  submit = new EventEmitter<{
    name: string;
  }>();

  @Output()
  cancel = new EventEmitter();

  categoryInput: {
    name: string;
  };

  constructor() {
    this.categoryInput = {
      name: '',
    };
  }

  ngOnInit() {
    if (this.category != null) {
      this.categoryInput.name = this.category.name;
    }
  }

  onSubmit() {
    this.submit.emit({
      name: this.categoryInput.name,
    });
  }

  onCancel() {
    this.cancel.emit(this.category != null ? this.category.serverId : null);
  }
}
