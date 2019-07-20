import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ContentsQuery } from 'src/app/store/contents/contents.query';
import { ContentsService } from 'src/app/store/contents/contents.service';
import { GroupsQuery } from 'src/app/store/groups/groups.query';
import { ServersQuery } from 'src/app/store/servers/servers.query';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;

  contentId = this.route.snapshot.paramMap.get('id');

  contentState$ = this.contentsQuery.selectEntity(this.contentId);

  serverState$ = this.serversQuery.selectByContent(this.contentId);

  visibleGroupsState$ = this.groupsQuery.selectByContent(this.contentId);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contentsService: ContentsService,
    private contentsQuery: ContentsQuery,
    private serversQuery: ServersQuery,
    private groupsQuery: GroupsQuery
  ) {}

  ngOnInit() {
    this.contentsService.getById(this.contentId);
    this.contentsService.getThumbnail(this.contentId);
  }

  onDelete(contentId: string) {
    this.contentsService.delete(this.contentId);
  }

  onServerRedirect(serverId: string) {
    this.router.navigateByUrl('/server/' + serverId);
  }

  onGroupRedirect(groupId: string) {
    // this.router.navigateByUrl('/group/' + groupId);
  }
}
