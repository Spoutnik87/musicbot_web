import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerModel } from '../models/server.model';
import { ConfigService } from './config.service';

@Injectable()
export class ServerService {
  constructor(private configService: ConfigService, private httpClient: HttpClient) {}

  getAll(): Observable<ServerModel[]> {
    return this.httpClient.get(`${this.configService.getApiUrl()}/server/list`) as Observable<ServerModel[]>;
  }

  getById(id: string): Observable<ServerModel> {
    return this.httpClient.get(`${this.configService.getApiUrl()}/server/${id}`) as Observable<ServerModel>;
  }

  create(name: string): Observable<ServerModel> {
    return this.httpClient.post(`${this.configService.getApiUrl()}/server`, {
      name,
    }) as Observable<ServerModel>;
  }

  update(id: string, name: string): Observable<ServerModel> {
    return this.httpClient.put(`${this.configService.getApiUrl()}/server/${id}`, {
      name,
    }) as Observable<ServerModel>;
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.configService.getApiUrl()}/server/${id}`);
  }
}
