import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupModel } from '../models/group.model';
import { ConfigService } from './config.service';

@Injectable()
export class GroupService {
  constructor(private configService: ConfigService, private httpClient: HttpClient) {}

  getAll(): Observable<GroupModel[]> {
    return this.httpClient.get(`${this.configService.getApiUrl()}/group/list`) as Observable<GroupModel[]>;
  }

  getById(id: string): Observable<GroupModel> {
    return this.httpClient.get(`${this.configService.getApiUrl()}/group/${id}`) as Observable<GroupModel>;
  }

  create(serverId: string, name: string): Observable<GroupModel> {
    return this.httpClient.post(`${this.configService.getApiUrl()}/group`, {
      serverId,
      name,
    }) as Observable<GroupModel>;
  }

  update(id: string, serverId: string, name: string): Observable<GroupModel> {
    return this.httpClient.put(`${this.configService.getApiUrl()}/group/${id}`, {
      serverId,
      name,
    }) as Observable<GroupModel>;
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.configService.getApiUrl()}/group/${id}`);
  }
}
