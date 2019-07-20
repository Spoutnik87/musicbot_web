import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GroupModel } from 'src/app/models/group.model';
import { ConfigService } from 'src/app/services';
import { GroupsStore } from './groups.store';

@Injectable()
export class GroupsService {
  constructor(private configService: ConfigService, private httpClient: HttpClient, private groupsStore: GroupsStore) {}

  getAll(): void {
    this.groupsStore.setLoading(true);
    this.httpClient.get(`${this.configService.getApiUrl()}/group/list`).subscribe(
      (groups: GroupModel[]) => {
        this.groupsStore.set(
          groups.map(group => ({
            id: group.id,
            group,
            loading: false,
            loaded: true,
            updating: false,
            updated: false,
          }))
        );
        this.groupsStore.setLoading(false);
      },
      () => {
        this.groupsStore.setLoading(false);
      }
    );
  }

  getById(id: string): void {
    this.groupsStore.upsert(id, current => ({
      id,
      group: {
        ...(current && current.group),
        id,
      },
      loading: true,
      loaded: false,
      updating: false,
      updated: false,
    }));
    this.httpClient.get(`${this.configService.getApiUrl()}/group/${id}`).subscribe(
      (group: GroupModel) => {
        this.groupsStore.upsert(group.id, current => ({
          id: group.id,
          group: {
            ...(current && current.group),
            id: group.id,
            ...group,
          },
          loading: false,
          loaded: true,
          updating: false,
          updated: false,
        }));
      },
      () => {
        this.groupsStore.upsert(id, current => ({
          loading: false,
          loaded: false,
        }));
      }
    );
  }

  getByServer(serverId: string): void {
    this.httpClient.get(`${this.configService.getApiUrl()}/group/server/${serverId}`).subscribe(
      (groups: GroupModel[]) => {
        groups.forEach(group => {
          this.groupsStore.upsert(group.id, current => ({
            id: group.id,
            group: {
              ...(current && current.group),
              id: group.id,
              ...group,
            },
            loading: false,
            loaded: true,
            updating: false,
            updated: false,
          }));
        });
      },
      () => {}
    );
  }

  create(serverId: string, name: string): Observable<string> {
    return this.httpClient
      .post(`${this.configService.getApiUrl()}/group`, {
        serverId,
        name,
      })
      .pipe(
        map((group: GroupModel) => {
          this.groupsStore.upsert(group.id, () => ({
            ...group,
            loading: true,
            loaded: false,
            updating: false,
            updated: false,
          }));
          return group.id;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  update(id: string, name: string): void {
    this.groupsStore.upsert(id, current => ({
      id,
      updating: true,
      updated: false,
    }));
    this.httpClient
      .put(`${this.configService.getApiUrl()}/group/${id}`, {
        name,
      })
      .subscribe(
        (group: GroupModel) => {
          this.groupsStore.upsert(group.id, () => ({
            ...group,
            loading: false,
            loaded: false,
            updating: true,
            updated: false,
          }));
        },
        () => {
          this.groupsStore.upsert(id, current => ({
            id,
            updating: false,
            updated: false,
          }));
        }
      );
  }

  delete(id: string): void {
    this.httpClient.delete(`${this.configService.getApiUrl()}/group/${id}`).subscribe(
      () => {
        this.groupsStore.remove(id);
      },
      () => {}
    );
  }

  getThumbnail(id: string): void {
    this.httpClient
      .get(`${this.configService.getApiUrl()}/group/${id}/thumbnail`, {
        responseType: 'blob',
      })
      .pipe(map(blob => URL.createObjectURL(blob)))
      .subscribe(
        thumbnailURL => {
          this.groupsStore.upsert(id, current => ({
            id,
            group: {
              ...(current && current.group),
              id,
              thumbnailURL,
            },
          }));
        },
        () => {}
      );
  }
}
