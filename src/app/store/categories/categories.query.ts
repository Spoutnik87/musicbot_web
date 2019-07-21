import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryModel } from 'src/app/models/category.model';
import { CategoriesState, CategoriesStore, CategoryState } from './categories.store';

@Injectable({ providedIn: 'root' })
export class CategoriesQuery extends QueryEntity<CategoriesState, CategoryState> {
  categories$ = this.selectAll().pipe(map(categoriesState => categoriesState.map(categoryState => categoryState.category)));

  constructor(protected store: CategoriesStore) {
    super(store);
  }

  selectCategory(id: string) {
    return this.selectEntity(id).pipe(map(categoryState => categoryState.category));
  }

  selectByServer(serverId: string): Observable<CategoryState[]> {
    return this.selectAll().pipe(
      map(categoriesState =>
        categoriesState.filter(categoryState => categoryState.category != null && categoryState.category.serverId === serverId)
      )
    );
  }

  selectCategoriesByServer(serverId: string): Observable<CategoryModel[]> {
    return this.selectByServer(serverId).pipe(map(categoriesState => categoriesState.map(categoryState => categoryState.category)));
  }
}
