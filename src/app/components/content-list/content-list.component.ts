import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ContentModel } from 'src/app/models/content.model';
import { ServerStatusModel } from 'src/app/models/server-status.model';
import { ServerModel } from 'src/app/models/server.model';
import { IAppState } from 'src/app/store';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
})
export class ContentListComponent {
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
