import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ContentModel } from '../models/content.model';
import { ConfigService } from './config.service';

@Injectable()
export class ContentService {
  constructor(private configService: ConfigService, private httpClient: HttpClient) {}

  getByServerId(serverId: string): Observable<ContentModel[]> {
    return this.httpClient.get(`${this.configService.getApiUrl()}/server/${serverId}`) as Observable<ContentModel[]>;
  }

  getById(id: string): Observable<ContentModel> {
    return this.httpClient.get(`${this.configService.getApiUrl()}/content/${id}`) as Observable<ContentModel>;
  }

  create(
    groupId: string,
    name: string,
    categoryId: string,
    contentTypeId: string,
    thumbnail: any = null,
    media: any = null
  ): Observable<ContentModel> {
    if (thumbnail == null || media == null) {
      return this.httpClient.post(`${this.configService.getApiUrl()}/content`, {
        groupId,
        name,
        categoryId,
        contentTypeId,
      }) as Observable<ContentModel>;
    } else {
      return this.httpClient
        .post(`${this.configService.getApiUrl()}/content`, {
          groupId,
          name,
          categoryId,
          contentTypeId,
        })
        .pipe(
          switchMap((content: ContentModel) => this.updateThumbnail(content.id, thumbnail)),
          switchMap((content: ContentModel) => this.updateMedia(content.id, media))
        ) as Observable<ContentModel>;
    }
  }

  update(id: string, groupId: string, name: string, categoryId: string, contentTypeId: string): Observable<ContentModel> {
    return this.httpClient.put(`${this.configService.getApiUrl()}/content/${id}`, {
      groupId,
      name,
      categoryId,
      contentTypeId,
    }) as Observable<ContentModel>;
  }

  updateThumbnail(contentId: string, thumbnail: any) {
    const form: FormData = new FormData();
    form.append('file', thumbnail);
    return this.httpClient.put(`${this.configService.getApiUrl()}/content/${contentId}/thumbnail`, form) as Observable<ContentModel>;
  }

  updateMedia(contentId: string, media: any) {
    const form: FormData = new FormData();
    form.append('file', media);
    return this.httpClient.put(`${this.configService.getApiUrl()}/content/${contentId}/media`, form) as Observable<ContentModel>;
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.configService.getApiUrl()}/content/${id}`);
  }
}
