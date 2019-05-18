import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Permission } from 'src/app/enums/Permission';
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

  constructor(private route: ActivatedRoute, private store: Store<IAppState>, private router: Router) {
    this.store.dispatch(new FetchServerGroups(this.serverId));
    this.store.dispatch(new FetchServerCategories(this.serverId));
  }

  onSubmit(event: { name: string; thumbnail: any; media: any; categoryId: string; groupId: string }) {
    this.store.dispatch(new CreateContent(this.serverId, event.groupId, event.name, event.categoryId, '', event.thumbnail, event.media));
  }

  onCancel() {
    this.router.navigateByUrl(`/server/${this.serverId}`);
  }
}
