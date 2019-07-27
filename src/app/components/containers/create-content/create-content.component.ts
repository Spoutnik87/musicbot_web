import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, iif, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Permission } from 'src/app/enums/Permission';
import { CategoriesQuery } from 'src/app/store/categories/categories.query';
import { CategoriesService } from 'src/app/store/categories/categories.service';
import { ContentsService } from 'src/app/store/contents/contents.service';
import { GroupsQuery } from 'src/app/store/groups/groups.query';
import { GroupsService } from 'src/app/store/groups/groups.service';

@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html',
})
export class CreateContentComponent {
  serverId = this.route.snapshot.paramMap.get('id');

  categories$ = this.categoriesQuery.selectCategoriesByServer(this.serverId);
  categoriesLoading$ = this.categoriesQuery.selectLoading();

  groups$ = this.groupsQuery
    .selectGroupsByServer(this.serverId)
    .pipe(map(groups => groups.filter(group => group.member === true && group.permissions.includes(Permission.CREATE_CONTENT))));
  groupsLoading$ = this.groupsQuery.selectLoading();

  loading$ = combineLatest([this.categoriesLoading$, this.groupsLoading$]).pipe(map(([a, b]) => a || b));

  contentId = null;
  contentCreated = false;
  contentThumbnailCreated = false;
  contentMediaCreated = false;

  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private groupsService: GroupsService,
    private categoriesService: CategoriesService,
    private groupsQuery: GroupsQuery,
    private categoriesQuery: CategoriesQuery,
    private contentsService: ContentsService
  ) {
    this.groupsService.getByServer(this.serverId);
    this.categoriesService.getByServer(this.serverId);
  }

  onSubmit(event: {
    name: string;
    description: string;
    thumbnail: any;
    media: any;
    categoryId: string;
    visibleGroupList: {
      id: string;
      visible: boolean;
    }[];
    contentType: string;
    link: string;
  }) {
    this.loading = true;
    /**
     * Thumbnail is optionnal. Don't send it if thumbnail is null.
     */
    of(event)
      .pipe(
        // Step 1 - Creating the content
        switchMap(() =>
          iif(
            () => !this.contentCreated,
            this.contentsService
              .create(
                event.visibleGroupList,
                event.name,
                event.description,
                event.categoryId,
                event.contentType,
                event.link != null && event.link !== '' ? event.link : undefined
              )
              .pipe(
                map(contentId => {
                  this.contentId = contentId;
                  this.contentCreated = true;
                })
              ),
            of(event)
          )
        ),
        // Step 2 - Uploading the thumbnail if needed
        switchMap(() =>
          iif(
            () => event.thumbnail != null && !this.contentThumbnailCreated,
            this.contentsService.updateThumbnail(this.contentId, event.thumbnail).pipe(
              map(() => {
                this.contentThumbnailCreated = true;
              })
            ),
            of(event)
          )
        ),
        // Step 3 - If it's a LOCAL content, uploading the media.
        switchMap(() =>
          iif(
            () => event.contentType === 'LOCAL' && !this.contentMediaCreated,
            this.contentsService.updateMedia(this.contentId, event.media).pipe(
              map(() => {
                this.contentMediaCreated = true;
              })
            ),
            of(event)
          )
        )
      )
      .subscribe(
        () => {
          this.router.navigateByUrl(`/server/${this.serverId}`);
        },
        () => {
          this.loading = false;
        }
      );
  }

  onCancel() {
    this.router.navigateByUrl(`/server/${this.serverId}`);
  }
}
