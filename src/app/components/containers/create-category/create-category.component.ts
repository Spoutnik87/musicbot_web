import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CreateCategory, IAppState } from 'src/app/store';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
})
export class CreateCategoryComponent {
  loading = false;

  serverId = this.route.snapshot.paramMap.get('id');

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<IAppState>) {}

  onSubmit(event: { name: string }) {
    this.store.dispatch(new CreateCategory(this.serverId, event.name));
  }

  onCancel() {
    this.router.navigateByUrl(`/server/${this.serverId}`);
  }
}
