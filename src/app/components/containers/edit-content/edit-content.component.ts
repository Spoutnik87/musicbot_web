import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentsQuery } from 'src/app/store/contents/contents.query';
import { ContentsService } from 'src/app/store/contents/contents.service';

@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
})
export class EditContentComponent {
  contentId = this.route.snapshot.paramMap.get('id');

  contentState$ = this.contentsQuery.selectEntity(this.contentId);

  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contentsQuery: ContentsQuery,
    private contentsService: ContentsService
  ) {
    this.contentsService.getById(this.contentId);
    this.contentsService.getThumbnail(this.contentId);
  }

  onSubmit(event: {
    name: string;
    description: string;
    categoryId: string;
    contentType: string;
    visibleGroupList: {
      id: string;
      visible: boolean;
    }[];
  }) {
    this.contentsService.update(this.contentId, event.visibleGroupList, event.name, event.description, event.categoryId, event.contentType);
  }

  onCancel(serverId: string) {
    if (serverId != null) {
      this.router.navigateByUrl(`/manage-server/${serverId}`);
    } else {
      this.router.navigateByUrl('');
    }
  }
}
