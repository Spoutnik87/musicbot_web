import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/category.model';
import { GroupModel } from 'src/app/models/group.model';

@Component({
  selector: 'app-content-form',
  templateUrl: './content-form.component.html',
})
export class ContentFormComponent {
  @Input()
  loading: boolean;

  @Input()
  serverId: string;

  @Input()
  groups: GroupModel[];

  @Input()
  categories: CategoryModel[];

  step = 1;

  @Output()
  submit = new EventEmitter<{
    name: string;
    categoryId: string;
    groupId: string;
    thumbnail: any;
    media: any;
  }>();

  @Output()
  cancel = new EventEmitter();

  content: {
    name: string;
    categoryId: string;
    groupId: string;
    thumbnail?: any;
    media?: any;
    thumbnailFile?: any;
    mediaFile?: any;
  };

  constructor() {
    this.content = {
      categoryId: '',
      groupId: '',
      name: '',
    };
  }

  onCancel() {
    if (this.step > 1) {
      this.step--;
    } else {
      this.cancel.emit();
    }
  }

  onSubmit() {
    if (this.step < 3) {
      this.step++;
    } else {
      this.submit.emit({
        name: this.content.name,
        categoryId: this.content.categoryId,
        groupId: this.content.groupId,
        thumbnail: this.content.thumbnailFile,
        media: this.content.mediaFile,
      });
    }
  }

  onFileChange(event) {
    // Thumbnail upload
    if (this.step === 2) {
      const file = event.target.files[0];
      this.content.thumbnailFile = file;
      const reader = new FileReader();
      reader.addEventListener('loadend', () => {
        this.content.thumbnail = reader.result;
      });
      if (file) {
        reader.readAsDataURL(file);
      }
      // Media upload
    } else if (this.step === 3) {
      const file = event.target.files[0];
      this.content.mediaFile = file;
      const reader = new FileReader();
      reader.addEventListener('loadend', () => {
        this.content.media = reader.result;
      });
      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }
}
