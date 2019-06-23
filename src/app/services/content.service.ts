import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContentModel } from '../models/content.model';
import { ConfigService } from './config.service';

@Injectable()
export class ContentService {
  constructor(private configService: ConfigService, private httpClient: HttpClient, private sanitizer: DomSanitizer) {}

  getByServerId(serverId: string): Observable<ContentModel[]> {
    return this.httpClient.get(`${this.configService.getApiUrl()}/content/server/${serverId}`) as Observable<ContentModel[]>;
  }

  getById(id: string): Observable<ContentModel> {
    return this.httpClient.get(`${this.configService.getApiUrl()}/content/${id}`) as Observable<ContentModel>;
  }

  create(
    visibleGroupList: { id: string; visible: boolean }[],
    name: string,
    description: string,
    categoryId: string,
    contentType: string,
    link?: string
  ): Observable<ContentModel> {
    return this.httpClient.post(`${this.configService.getApiUrl()}/content`, {
      visibleGroupList,
      name,
      description,
      categoryId,
      contentType,
      link,
    }) as Observable<ContentModel>;
  }

  update(
    id: string,
    visibleGroupList: { id: string; visible: boolean }[],
    name: string,
    description: string,
    categoryId: string,
    contentType: string
  ): Observable<ContentModel> {
    return this.httpClient.put(`${this.configService.getApiUrl()}/content/${id}`, {
      visibleGroupList,
      name,
      description,
      contentType,
      categoryId,
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

  getThumbnail(id: string): Observable<string> {
    return this.httpClient
      .get(`${this.configService.getApiUrl()}/content/${id}/thumbnail`, {
        responseType: 'blob',
      })
      .pipe(map(blob => this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob)))) as Observable<string>;
  }
}
