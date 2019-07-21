import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CategoriesQuery } from 'src/app/store/categories/categories.query';
import { CategoriesService } from 'src/app/store/categories/categories.service';
import { ServersQuery } from 'src/app/store/servers/servers.query';
import { ServersService } from 'src/app/store/servers/servers.service';

@Component({
  selector: 'app-manage-server',
  templateUrl: './manage-server.component.html',
})
export class ManageServerComponent {
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;
  serverId = this.route.snapshot.paramMap.get('id');

  serverState$ = this.serversQuery.selectEntity(this.serverId);

  categories$ = this.categoriesQuery.selectByServer(this.serverId);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService,
    private serversService: ServersService,
    private serversQuery: ServersQuery,
    private categoriesQuery: CategoriesQuery
  ) {
    this.serversService.getById(this.serverId);
    this.categoriesService.getByServer(this.serverId);
  }

  onEdit(categoryId: string) {
    this.router.navigateByUrl(`/edit-category/${categoryId}`);
  }

  onDelete(categoryId: string) {
    this.categoriesService.delete(categoryId);
  }
}
