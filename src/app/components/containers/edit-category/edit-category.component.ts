import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesQuery } from 'src/app/store/categories/categories.query';
import { CategoriesService } from 'src/app/store/categories/categories.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
})
export class EditCategoryComponent {
  categoryId = this.route.snapshot.paramMap.get('id');

  categoryState = this.categoriesQuery.selectEntity(this.categoryId);

  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriesQuery: CategoriesQuery,
    private categoriesService: CategoriesService
  ) {
    this.categoriesService.getById(this.categoryId);
  }

  onSubmit(event: { name: string }) {
    this.categoriesService.update(this.categoryId, event.name);
  }

  onCancel(serverId: string) {
    if (serverId != null) {
      this.router.navigateByUrl(`/manage-server/${serverId}`);
    } else {
      this.router.navigateByUrl('');
    }
  }
}
