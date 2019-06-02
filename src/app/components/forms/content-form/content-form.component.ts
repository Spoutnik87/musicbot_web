import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoryModel } from 'src/app/models/category.model';
import { ContentModel } from 'src/app/models/content.model';
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

  @Input()
  content: ContentModel = null;

  step = 1;

  @Output()
  submit = new EventEmitter<{
    name: string;
    description: string;
    categoryId: string;
    groupId: string;
    thumbnail: any;
    media: any;
  }>();

  @Output()
  cancel = new EventEmitter();

  contentInput: {
    name: string;
    description: string;
    categoryId: string;
    groupId: string;
    thumbnail?: any;
    media?: any;
    thumbnailFile?: any;
    mediaFile?: any;
  };

  constructor(private sanitizer: DomSanitizer) {
    this.contentInput = {
      categoryId: '',
      groupId: '',
      name: '',
      description: '',
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
        name: this.contentInput.name,
        description: this.contentInput.description,
        categoryId: this.contentInput.categoryId,
        groupId: this.contentInput.groupId,
        thumbnail: this.contentInput.thumbnailFile,
        media: this.contentInput.mediaFile,
      });
    }
  }

  onFileChange(event) {
    // Thumbnail upload
    if (this.step === 2) {
      const file = event.target.files[0];
      this.contentInput.thumbnailFile = file;
      const reader = new FileReader();
      reader.addEventListener('loadend', () => {
        this.contentInput.thumbnail = reader.result;
      });
      if (file) {
        reader.readAsDataURL(file);
      }
      // Media upload
    } else if (this.step === 3) {
      const file = event.target.files[0];
      this.contentInput.mediaFile = file;
      const reader = new FileReader();
      reader.addEventListener('loadend', () => {
        this.contentInput.media = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result as string);
      });
      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }

  onRemoveThumbnail() {
    this.contentInput.thumbnail = null;
    this.contentInput.thumbnailFile = null;
  }

  onRemoveMedia() {
    this.contentInput.media = null;
    this.contentInput.mediaFile = null;
  }
}
