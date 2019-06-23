import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, iif, of } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Permission } from 'src/app/enums/Permission';
import { ContentService } from 'src/app/services';
import {
  getCategoriesLoaded,
  getCategoriesLoading,
  getGroupsLoaded,
  getGroupsLoading,
  getServerCategories,
  getServerGroups,
  CreateContent,
  FetchServerCategories,
  FetchServerGroups,
  IAppState,
} from 'src/app/store';

@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html',
})
export class CreateContentComponent {
  loading = false;

  serverId = this.route.snapshot.paramMap.get('id');

  categories$ = this.store.select(getServerCategories, { serverId: this.serverId });
  categoriesLoading$ = this.store.select(getCategoriesLoading);
  categoriesLoaded$ = this.store.select(getCategoriesLoaded);

  groups$ = this.store
    .select(getServerGroups, { serverId: this.serverId })
    .pipe(map(groups => groups.filter(group => group.member === true && group.permissions.includes(Permission.CREATE_CONTENT))));
  groupsLoading$ = this.store.select(getGroupsLoading);
  groupsLoaded$ = this.store.select(getGroupsLoaded);

  loading$ = combineLatest([this.categoriesLoading$, this.groupsLoading$]).pipe(map(([a, b]) => a || b));
  loaded$ = combineLatest([this.categoriesLoaded$, this.groupsLoaded$]).pipe(map(([a, b]) => a && b));

  contentId = null;
  contentCreated = false;
  contentThumbnailCreated = false;
  contentMediaCreated = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store<IAppState>,
    private contentService: ContentService,
    private router: Router
  ) {
    this.store.dispatch(new FetchServerGroups(this.serverId));
    this.store.dispatch(new FetchServerCategories(this.serverId));
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
    const createThumbnail = (contentId: string, thumbnail: any) => {
      return this.contentService.updateThumbnail(contentId, thumbnail);
    };
    const createMedia = (contentId: string, media: any) => {
      return this.contentService.updateMedia(contentId, media);
    };
    /**
     * Thumbnail is optionnal. Don't send it if thumbnail is null.
     */
    of(event)
      .pipe(
        // Step 1 - Creating the content
        switchMap(() =>
          iif(
            () => !this.contentCreated,
            this.contentService
              .create(
                event.visibleGroupList,
                event.name,
                event.description,
                event.categoryId,
                event.contentType,
                event.link != null && event.link !== '' ? event.link : undefined
              )
              .pipe(
                map(content => {
                  this.contentId = content.id;
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
            this.contentService.updateThumbnail(this.contentId, event.thumbnail).pipe(
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
            this.contentService.updateMedia(this.contentId, event.media).pipe(
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
          this.onFinish();
        },
        () => {}
      );
  }

  onCancel() {
    this.router.navigateByUrl(`/server/${this.serverId}`);
  }

  onFinish() {
    this.router.navigateByUrl(`/server/${this.serverId}`);
  }
}
