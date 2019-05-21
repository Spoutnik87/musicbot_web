import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faEye, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { ContentModel } from 'src/app/models/content.model';
import { FetchContentThumbnail, IAppState } from 'src/app/store';

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.css'],
})
export class ContentCardComponent implements OnInit {
  faPlay = faPlay;
  faEye = faEye;
  @Input()
  content: ContentModel;

  @Output()
  play = new EventEmitter<string>();

  @Output()
  show = new EventEmitter<string>();

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    if (this.content.thumbnailURL == null) {
      this.store.dispatch(new FetchContentThumbnail(this.content.id));
    }
  }

  onPlay() {
    this.play.emit(this.content.id);
  }

  onShow() {
    this.show.emit(this.content.id);
  }
}
