import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { getServerCategories, getServerState, DeleteCategory, FetchServer, FetchServerCategories, IAppState } from 'src/app/store';

@Component({
  selector: 'app-manage-server',
  templateUrl: './manage-server.component.html',
})
export class ManageServerComponent {
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;
  serverId = this.route.snapshot.paramMap.get('id');

  serverState$ = this.store.select(getServerState, { id: this.serverId });

  categories$ = this.store.select(getServerCategories, { serverId: this.serverId });

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<IAppState>) {
    this.store.dispatch(new FetchServer(this.serverId));
    this.store.dispatch(new FetchServerCategories(this.serverId));
  }

  onEdit(categoryId: string) {
    this.router.navigateByUrl(`/edit-category/${categoryId}`);
  }

  onDelete(categoryId: string) {
    this.store.dispatch(new DeleteCategory(categoryId));
  }
}
