import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentModel } from '../models/content.model';
import { ConfigService } from './config.service';

@Injectable()
export class ContentService {
  constructor(private configService: ConfigService, private httpClient: HttpClient) {}

  getAll(): Observable<ContentModel[]> {
    return this.httpClient.get(`${this.configService.getApiUrl()}/content/list`) as Observable<ContentModel[]>;
  }

  getById(id: string): Observable<ContentModel> {
    return this.httpClient.get(`${this.configService.getApiUrl()}/content/${id}`) as Observable<ContentModel>;
  }

  create(groupId: string, name: string, categoryId: string, contentTypeId: string): Observable<ContentModel> {
    return this.httpClient.post(`${this.configService.getApiUrl()}/content`, {
      groupId,
      name,
      categoryId,
      contentTypeId,
    }) as Observable<ContentModel>;
  }

  update(id: string, groupId: string, name: string, categoryId: string, contentTypeId: string): Observable<ContentModel> {
    return this.httpClient.put(`${this.configService.getApiUrl()}/content/${id}`, {
      groupId,
      name,
      categoryId,
      contentTypeId,
    }) as Observable<ContentModel>;
  }

  updateMedia() {
    // TODO
  }

  updateThumbnail() {
    // TODO
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.configService.getApiUrl()}/content/${id}`);
  }
}
