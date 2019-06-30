import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css'],
})
export class ThumbnailComponent {
  @Input()
  width = 400;

  @Input()
  height = 400;

  sanitizedImageURL: SafeResourceUrl;

  @Input()
  set imageURL(value) {
    if (value != null) {
      this.sanitizedImageURL = this.sanitizer.bypassSecurityTrustResourceUrl(value);
    }
  }

  constructor(private sanitizer: DomSanitizer) {}

  /*@Input()
  id: string;

  @Input()
  type: 'content' | 'group' | 'server';

  imageURLSubject = new BehaviorSubject(null);
  imageURL$ = this.imageURLSubject.asObservable();

  constructor(
    private store: Store<IAppState>,
    private contentService: ContentService,
    private groupService: GroupService,
    private serverService: ServerService
  ) {}

  ngOnInit() {
    switch (this.type) {
      case 'content':
        this.store.select(getContent, { id: this.id }).subscribe(value => {
          console.log(value);
        });
        break;
      case 'group':
        break;
      case 'server':
        break;
      default:
    }
  }*/
}
