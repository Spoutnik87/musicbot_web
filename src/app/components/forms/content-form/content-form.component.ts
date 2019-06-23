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
    visibleGroupList: {
      id: string;
      visible: boolean;
    }[];
    contentType: string;
    link: string;
    thumbnail: any;
    media: any;
  }>();

  @Output()
  cancel = new EventEmitter();

  contentInput: {
    name: string;
    description: string;
    categoryId: string;
    contentType?: string;
    link?: string;
    visibleGroupList: {
      [id: string]: boolean;
    };
    thumbnail?: any;
    media?: any;
    thumbnailFile?: any;
    mediaFile?: any;
  };

  constructor(private sanitizer: DomSanitizer) {
    this.contentInput = {
      categoryId: '',
      visibleGroupList: {},
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
    if (this.step < 5) {
      this.step++;
    } else {
      this.submit.emit({
        name: this.contentInput.name,
        description: this.contentInput.description,
        categoryId: this.contentInput.categoryId,
        contentType: this.contentInput.contentType,
        link: this.contentInput.link,
        visibleGroupList: Object.keys(this.contentInput.visibleGroupList).map(key => ({
          id: key,
          visible: this.contentInput.visibleGroupList[key],
        })),
        thumbnail: this.contentInput.thumbnailFile,
        media: this.contentInput.mediaFile,
      });
    }
  }

  onFileChange(event) {
    // Thumbnail upload
    if (this.step === 3) {
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
    } else if (this.step === 4) {
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
