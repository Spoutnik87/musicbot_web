import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/store/categories/categories.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
})
export class CreateCategoryComponent {
  loading = false;

  serverId = this.route.snapshot.paramMap.get('id');

  constructor(private route: ActivatedRoute, private router: Router, private categoriesService: CategoriesService) {}

  onSubmit(event: { name: string }) {
    this.categoriesService.create(this.serverId, event.name).subscribe(
      () => {
        this.router.navigateByUrl('/server/' + this.serverId);
      },
      () => {}
    );
  }

  onCancel() {
    this.router.navigateByUrl(`/server/${this.serverId}`);
  }
}
