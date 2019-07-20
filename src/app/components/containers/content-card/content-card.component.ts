import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faEye, faPlay } from '@fortawesome/free-solid-svg-icons';
import { ContentModel } from 'src/app/models/content.model';
import { ContentsService } from 'src/app/store/contents/contents.service';

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

  constructor(private contentsService: ContentsService) {}

  ngOnInit() {
    if (this.content.thumbnailURL == null) {
      this.contentsService.getThumbnail(this.content.id);
    }
  }

  onPlay() {
    this.play.emit(this.content.id);
  }

  onShow() {
    this.show.emit(this.content.id);
  }
}
