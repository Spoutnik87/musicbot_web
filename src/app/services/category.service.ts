import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryModel } from '../models/category.model';
import { ConfigService } from './config.service';

@Injectable()
export class CategoryService {
  constructor(private configService: ConfigService, private httpClient: HttpClient) {}

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

  update(id: string, serverId: string, name: string): Observable<CategoryModel> {
    return this.httpClient.put(`${this.configService.getApiUrl()}/category/${id}`, {
      serverId,
      name,
    }) as Observable<CategoryModel>;
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.configService.getApiUrl()}/category/${id}`);
  }
}
