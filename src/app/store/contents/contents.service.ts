import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ContentModel } from 'src/app/models/content.model';
import { ConfigService } from 'src/app/services';
import { ContentsStore } from './contents.store';

@Injectable()
export class ContentsService {
  constructor(private configService: ConfigService, private httpClient: HttpClient, private contentsStore: ContentsStore) {}

  getAll(): void {
    this.contentsStore.setLoading(true);
    this.httpClient.get(`${this.configService.getApiUrl()}/content/list`).subscribe(
      (contents: ContentModel[]) => {
        this.contentsStore.set(
          contents.map(content => ({
            id: content.id,
            content,
            loading: false,
            loaded: true,
            updating: false,
            updated: false,
          }))
        );
        this.contentsStore.setLoading(false);
      },
      () => {
        this.contentsStore.setLoading(false);
      }
    );
  }

  getById(id: string): void {
    this.contentsStore.upsert(id, current => ({
      id,
      content: {
        ...(current && current.content),
        id,
      },
      loading: true,
      loaded: false,
      updating: false,
      updated: false,
    }));
    this.httpClient.get(`${this.configService.getApiUrl()}/content/${id}`).subscribe(
      (content: ContentModel) => {
        this.contentsStore.upsert(content.id, current => ({
          id: content.id,
          content: {
            ...(current && current.content),
            id: content.id,
            ...content,
          },
          loading: false,
          loaded: true,
          updating: false,
          updated: false,
        }));
      },
      () => {
        this.contentsStore.upsert(id, current => ({
          loading: false,
          loaded: false,
        }));
      }
    );
  }

  getByServer(id: string): void {
    this.httpClient.get(`${this.configService.getApiUrl()}/content/server/${id}`).subscribe(
      (contents: ContentModel[]) => {
        contents.forEach(content => {
          this.contentsStore.upsert(content.id, current => ({
            id: content.id,
            content: {
              ...(current && current.content),
              id: content.id,
              ...content,
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

  create(
    visibleGroupList: {
      id: string;
      visible: boolean;
    }[],
    name: string,
    description: string,
    categoryId: string,
    contentTypeId: string,
    link?: string
  ): Observable<string> {
    return this.httpClient
      .post(`${this.configService.getApiUrl()}/content`, {
        visibleGroupList,
        name,
        description,
        categoryId,
        contentType: contentTypeId,
        link,
      })
      .pipe(
        map((content: ContentModel) => {
          this.contentsStore.upsert(content.id, () => ({
            ...content,
            loading: true,
            loaded: false,
            updating: false,
            updated: false,
          }));
          return content.id;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  update(
    id: string,
    visibleGroupList: {
      id: string;
      visible: boolean;
    }[],
    name: string,
    description: string,
    categoryId: string,
    contentTypeId: string,
    link?: string
  ): void {
    this.contentsStore.upsert(id, current => ({
      id,
      updating: true,
      updated: false,
    }));
    this.httpClient
      .put(`${this.configService.getApiUrl()}/content/${id}`, {
        visibleGroupList,
        name,
        description,
        categoryId,
        contentType: contentTypeId,
        link,
      })
      .subscribe(
        (content: ContentModel) => {
          this.contentsStore.upsert(content.id, () => ({
            ...content,
            loading: false,
            loaded: false,
            updating: true,
            updated: false,
          }));
        },
        () => {
          this.contentsStore.upsert(id, current => ({
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
        this.contentsStore.remove(id);
      },
      () => {}
    );
  }

  updateThumbnail(contentId: string, thumbnail: any): Observable<ContentModel> {
    const form: FormData = new FormData();
    form.append('file', thumbnail);
    return this.httpClient.put(`${this.configService.getApiUrl()}/content/${contentId}/thumbnail`, form) as Observable<ContentModel>;
  }

  updateMedia(contentId: string, media: any): Observable<ContentModel> {
    const form: FormData = new FormData();
    form.append('file', media);
    return this.httpClient.put(`${this.configService.getApiUrl()}/content/${contentId}/media`, form) as Observable<ContentModel>;
  }

  getThumbnail(id: string): void {
    this.httpClient
      .get(`${this.configService.getApiUrl()}/content/${id}/thumbnail`, {
        responseType: 'blob',
      })
      .pipe(map(blob => URL.createObjectURL(blob)))
      .subscribe(
        thumbnailURL => {
          this.contentsStore.upsert(id, current => ({
            id,
            content: {
              ...(current && current.content),
              id,
              thumbnailURL,
            },
          }));
        },
        () => {}
      );
  }
}
