import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ContentModel } from 'src/app/models/content.model';
import { ServerStatusModel } from 'src/app/models/server-status.model';
import { ServerModel } from 'src/app/models/server.model';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
})
export class ContentListComponent {
  faPlus = faPlus;

  @Input()
  server: ServerModel;

  @Input()
  contents: ContentModel[];

  @Output()
  play = new EventEmitter<{
    id: string;
    status: ServerStatusModel;
  }>();

  @Output()
  show = new EventEmitter<{
    id: string;
    status: ServerStatusModel;
  }>();

  onPlay(contentId: string) {
    this.play.emit({
      id: contentId,
      status: this.server.status,
    });
  }

  onShow(contentId: string) {
    this.show.emit({
      id: contentId,
      status: this.server.status,
    });
  }
}
