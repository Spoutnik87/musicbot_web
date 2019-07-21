import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { CategoryModel } from 'src/app/models/category.model';

export interface CategoriesState extends EntityState<CategoryState, string> {}

export interface CategoryState {
  id: string;
  category: CategoryModel;
  loading: boolean;
  loaded: boolean;
  updating: boolean;
  updated: boolean;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'categories' })
export class CategoriesStore extends EntityStore<CategoriesState, CategoryState> {
  constructor() {
    super();
  }
}
