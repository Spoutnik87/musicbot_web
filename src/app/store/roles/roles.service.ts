import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RoleModel } from 'src/app/models/role.model';
import { ConfigService } from 'src/app/services';
import { RolesStore } from './roles.store';

@Injectable()
export class RolesService {
  constructor(private configService: ConfigService, private httpClient: HttpClient, private rolesStore: RolesStore) {}

  getAll(): void {
    this.rolesStore.setLoading(true);
    this.httpClient.get(`${this.configService.getApiUrl()}/role/list`).subscribe(
      (roles: RoleModel[]) => {
        this.rolesStore.set(
          roles.map(role => ({
            id: role.id,
            role,
            loading: false,
            loaded: true,
            updating: false,
            updated: false,
          }))
        );
        this.rolesStore.setLoading(false);
      },
      () => {
        this.rolesStore.setLoading(false);
      }
    );
  }

  getById(id: string): void {
    this.rolesStore.upsert(id, current => ({
      id,
      role: {
        ...(current && current.role),
        id,
      },
      loading: true,
      loaded: false,
      updating: false,
      updated: false,
    }));
    this.httpClient.get(`${this.configService.getApiUrl()}/role/${id}`).subscribe(
      (role: RoleModel) => {
        this.rolesStore.upsert(role.id, current => ({
          id: role.id,
          role: {
            ...(current && current.role),
            id: role.id,
            ...role,
          },
          loading: false,
          loaded: true,
          updating: false,
          updated: false,
        }));
      },
      () => {
        this.rolesStore.upsert(id, current => ({
          loading: false,
          loaded: false,
        }));
      }
    );
  }

  create(name: string): Observable<string> {
    return this.httpClient
      .post(`${this.configService.getApiUrl()}/role`, {
        name,
      })
      .pipe(
        map((role: RoleModel) => {
          this.rolesStore.upsert(role.id, () => ({
            ...role,
            loading: true,
            loaded: false,
            updating: false,
            updated: false,
          }));
          return role.id;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  update(id: string, name: string): void {
    this.rolesStore.upsert(id, current => ({
      id,
      updating: true,
      updated: false,
    }));
    this.httpClient
      .put(`${this.configService.getApiUrl()}/role/${id}`, {
        name,
      })
      .subscribe(
        (role: RoleModel) => {
          this.rolesStore.upsert(role.id, () => ({
            ...role,
            loading: false,
            loaded: false,
            updating: true,
            updated: false,
          }));
        },
        () => {
          this.rolesStore.upsert(id, current => ({
            id,
            updating: false,
            updated: false,
          }));
        }
      );
  }

  delete(id: string): void {
    this.httpClient.delete(`${this.configService.getApiUrl()}/role/${id}`).subscribe(
      () => {
        this.rolesStore.remove(id);
      },
      () => {}
    );
  }
}
