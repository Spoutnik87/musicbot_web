import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { faArrowCircleLeft, faArrowCircleRight, faSave, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { of, BehaviorSubject } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import { CategoryModel } from 'src/app/models/category.model';
import { ContentModel } from 'src/app/models/content.model';
import { GroupModel } from 'src/app/models/group.model';

@Component({
  selector: 'app-content-form',
  templateUrl: './content-form.component.html',
})
export class ContentFormComponent {
  faArrowCircleLeft = faArrowCircleLeft;
  faArrowCircleRight = faArrowCircleRight;
  faSave = faSave;
  faTrash = faTrash;
  faUpload = faUpload;

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
    contentType: string;
    link?: string;
    visibleGroupList: {
      [id: string]: boolean;
    };
    thumbnail?: any;
    media?: any;
    thumbnailFile?: any;
    mediaFile?: any;
  } = {
    categoryId: '',
    visibleGroupList: {},
    name: '',
    description: '',
    contentType: 'YOUTUBE',
  };

  videoId: string;

  videoIdSubject = new BehaviorSubject(this.videoId != null ? 'https://www.youtube.com/watch?v=' + this.videoId : null);
  videoId$ = this.videoIdSubject.asObservable().pipe(
    debounceTime(500),
    switchMap(value =>
      of(value).pipe(
        map(it => {
          const url = new URL(it);
          const videoId = url.searchParams.get('v');
          this.videoId = videoId;
          return videoId;
        }),
        catchError(() => of(undefined))
      )
    )
  );

  constructor(private sanitizer: DomSanitizer) {}

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
        link: this.videoId != null ? 'https://www.youtube.com/watch?v=' + this.videoId : null,
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

  onVideoLinkChange(event) {
    this.videoIdSubject.next(event);
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
