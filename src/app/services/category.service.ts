import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryModel } from '../models/category.model';
import { ConfigService } from './config.service';

@Injectable()
export class CategoryService {
  constructor(private configService: ConfigService, private httpClient: HttpClient, private sanitizer: DomSanitizer) {}

  getByServerId(serverId: string): Observable<CategoryModel[]> {
    return this.httpClient.get(`${this.configService.getApiUrl()}/category/server/${serverId}`) as Observable<CategoryModel[]>;
  }

  getById(id: string): Observable<CategoryModel> {
    return this.httpClient.get(`${this.configService.getApiUrl()}/category/${id}`) as Observable<CategoryModel>;
  }

  create(serverId: string, name: string): Observable<CategoryModel> {
    return this.httpClient.post(`${this.configService.getApiUrl()}/category`, {
      serverId,
      name,
    }) as Observable<CategoryModel>;
  }

  update(id: string, name: string): Observable<CategoryModel> {
    return this.httpClient.put(`${this.configService.getApiUrl()}/category/${id}`, {
      name,
    }) as Observable<CategoryModel>;
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.configService.getApiUrl()}/category/${id}`);
  }

  getThumbnail(id: string): Observable<string> {
    return this.httpClient
      .get(`${this.configService.getApiUrl()}/server/${id}/thumbnail`, {
        responseType: 'blob',
      })
      .pipe(map(blob => URL.createObjectURL(blob))) as Observable<string>;
  }
}
