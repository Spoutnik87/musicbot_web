import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleModel } from '../models/role.model';
import { ConfigService } from './config.service';

@Injectable()
export class RoleService {
  constructor(private configService: ConfigService, private httpClient: HttpClient) {}

  getAll(): Observable<RoleModel[]> {
    return this.httpClient.get(`${this.configService.getApiUrl()}/role/list`) as Observable<RoleModel[]>;
  }

  getById(id: string): Observable<RoleModel> {
    return this.httpClient.get(`${this.configService.getApiUrl()}/role/${id}`) as Observable<RoleModel>;
  }
}
