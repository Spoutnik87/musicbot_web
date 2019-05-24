import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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

  onSubmit(event: { name: string; description: string; thumbnail: any; media: any; categoryId: string; groupId: string }) {
    const createThumbnail = (contentId: string, thumbnail: any) => {
      return this.contentService.updateThumbnail(contentId, thumbnail);
    };
    const createMedia = (contentId: string, media: any) => {
      return this.contentService.updateMedia(contentId, media);
    };
    /**
     * Thumbnail is optionnal. Don't send it if thumbnail is null.
     */
    if (!this.contentCreated) {
      this.contentService
        .create(event.groupId, event.name, event.description, event.categoryId, '')
        .pipe(
          switchMap(content => {
            this.contentId = content.id;
            this.contentCreated = true;
            if (event.thumbnail == null) {
              return of(content);
            } else {
              return createThumbnail(content.id, event.thumbnail);
            }
          }),
          switchMap(content => {
            this.contentThumbnailCreated = true;
            return createMedia(content.id, event.media);
          }),
          map(content => {
            this.contentMediaCreated = true;
            return content;
          })
        )
        .subscribe(
          () => {
            this.onFinish();
          },
          () => {}
        );
    } else {
      if (!this.contentThumbnailCreated) {
        this.contentService.updateThumbnail(this.contentId, event.thumbnail).subscribe(
          () => {
            this.contentThumbnailCreated = true;
            this.onFinish();
          },
          () => {}
        );
      }
      if (!this.contentMediaCreated) {
        this.contentService.updateMedia(this.contentId, event.media).subscribe(
          () => {
            this.contentMediaCreated = true;
            this.onFinish();
          },
          () => {}
        );
      }
    }
  }

  onCancel() {
    this.router.navigateByUrl(`/server/${this.serverId}`);
  }

  onFinish() {
    if (this.contentCreated && this.contentThumbnailCreated && this.contentMediaCreated) {
      this.router.navigateByUrl(`/server/${this.serverId}`);
    }
  }
}
