import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import {
  getContentState,
  getServerState,
  getServerStateByContentId,
  getVisibleGroupsState,
  DeleteContent,
  FetchContent,
  FetchContentThumbnail,
  IAppState,
} from 'src/app/store';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;

  contentId = this.route.snapshot.paramMap.get('id');

  contentState$ = this.store.select(getContentState, { id: this.contentId });

  serverState$ = this.store.select(getServerStateByContentId, { id: this.contentId });

  visibleGroupsState$ = this.store.select(getVisibleGroupsState, { id: this.contentId });

  constructor(private store: Store<IAppState>, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.store.dispatch(new FetchContent(this.contentId, true));
    this.store.dispatch(new FetchContentThumbnail(this.contentId));
  }

  onDelete(contentId: string) {
    this.store.dispatch(new DeleteContent(contentId));
  }

  onServerRedirect(serverId: string) {
    this.router.navigateByUrl('/server/' + serverId);
  }

  onGroupRedirect(groupId: string) {
    // this.router.navigateByUrl('/group/' + groupId);
  }
}
