import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CategoryModel } from 'src/app/models/category.model';
import { ConfigService } from 'src/app/services';
import { CategoriesStore } from './categories.store';

@Injectable()
export class CategoriesService {
  constructor(private configService: ConfigService, private httpClient: HttpClient, private categoriesStore: CategoriesStore) {}

  getAll(): void {
    this.categoriesStore.setLoading(true);
    this.httpClient.get(`${this.configService.getApiUrl()}/category/list`).subscribe(
      (categories: CategoryModel[]) => {
        this.categoriesStore.set(
          categories.map(category => ({
            id: category.id,
            category,
            loading: false,
            loaded: true,
            updating: false,
            updated: false,
          }))
        );
        this.categoriesStore.setLoading(false);
      },
      () => {
        this.categoriesStore.setLoading(false);
      }
    );
  }

  getById(id: string): void {
    this.categoriesStore.upsert(id, current => ({
      id,
      category: {
        ...(current && current.category),
        id,
      },
      loading: true,
      loaded: false,
      updating: false,
      updated: false,
    }));
    this.httpClient.get(`${this.configService.getApiUrl()}/category/${id}`).subscribe(
      (category: CategoryModel) => {
        this.categoriesStore.upsert(category.id, current => ({
          id: category.id,
          category: {
            ...(current && current.category),
            id: category.id,
            ...category,
          },
          loading: false,
          loaded: true,
          updating: false,
          updated: false,
        }));
      },
      () => {
        this.categoriesStore.upsert(id, current => ({
          loading: false,
          loaded: false,
        }));
      }
    );
  }

  getByServer(serverId: string): void {
    this.httpClient.get(`${this.configService.getApiUrl()}/category/server/${serverId}`).subscribe(
      (categories: CategoryModel[]) => {
        this.categoriesStore.upsertMany(
          categories.map(category => ({
            id: category.id,
            category,
            loading: false,
            loaded: true,
            updating: false,
            updated: false,
          }))
        );
      },
      () => {}
    );
  }

  create(serverId: string, name: string): Observable<string> {
    return this.httpClient
      .post(`${this.configService.getApiUrl()}/category`, {
        serverId,
        name,
      })
      .pipe(
        map((category: CategoryModel) => {
          this.categoriesStore.upsert(category.id, () => ({
            ...category,
            loading: true,
            loaded: false,
            updating: false,
            updated: false,
          }));
          return category.id;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  update(id: string, name: string): void {
    this.categoriesStore.upsert(id, current => ({
      id,
      updating: true,
      updated: false,
    }));
    this.httpClient
      .put(`${this.configService.getApiUrl()}/category/${id}`, {
        name,
      })
      .subscribe(
        (category: CategoryModel) => {
          this.categoriesStore.upsert(category.id, () => ({
            ...category,
            loading: false,
            loaded: false,
            updating: true,
            updated: false,
          }));
        },
        () => {
          this.categoriesStore.upsert(id, current => ({
            id,
            updating: false,
            updated: false,
          }));
        }
      );
  }

  delete(id: string): void {
    this.httpClient.delete(`${this.configService.getApiUrl()}/category/${id}`).subscribe(
      () => {
        this.categoriesStore.remove(id);
      },
      () => {}
    );
  }

  getThumbnail(id: string): void {
    this.httpClient
      .get(`${this.configService.getApiUrl()}/category/${id}/thumbnail`, {
        responseType: 'blob',
      })
      .pipe(map(blob => URL.createObjectURL(blob)))
      .subscribe(
        thumbnailURL => {
          this.categoriesStore.upsert(id, current => ({
            id,
            category: {
              ...(current && current.category),
              id,
              thumbnailURL,
            },
          }));
        },
        () => {}
      );
  }
}
