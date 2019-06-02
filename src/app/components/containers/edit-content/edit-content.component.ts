import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getContentState, FetchContent, FetchContentThumbnail, IAppState, UpdateContent } from 'src/app/store';

@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
})
export class EditContentComponent {
  contentId = this.route.snapshot.paramMap.get('id');

  contentState = this.store.select(getContentState, { id: this.contentId });

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<IAppState>) {
    this.store.dispatch(new FetchContent(this.contentId));
    this.store.dispatch(new FetchContentThumbnail(this.contentId));
  }

  onSubmit(event: { name: string; groupId: string; categoryId: string; contentTypeId: string }) {
    this.store.dispatch(new UpdateContent(this.contentId, event.groupId, event.name, event.categoryId, ''));
  }

  onCancel(serverId: string) {
    if (serverId != null) {
      this.router.navigateByUrl(`/manage-server/${serverId}`);
    } else {
      this.router.navigateByUrl('');
    }
  }
}
