import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getCategoryState, FetchCategory, IAppState, UpdateCategory } from 'src/app/store';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
})
export class EditCategoryComponent {
  categoryId = this.route.snapshot.paramMap.get('id');

  categoryState = this.store.select(getCategoryState, { id: this.categoryId });

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<IAppState>) {
    this.store.dispatch(new FetchCategory(this.categoryId));
  }

  onSubmit(event: { name: string }) {
    this.store.dispatch(new UpdateCategory(this.categoryId, event.name));
  }

  onCancel(serverId: string) {
    if (serverId != null) {
      this.router.navigateByUrl(`/manage-server/${serverId}`);
    } else {
      this.router.navigateByUrl('');
    }
  }
}
