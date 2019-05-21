import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  /**
   * Generate a token that must be entered in a discord server to link the server identified by @id
   * @param id Server id
   */
  getServerLinkToken(
    id: string
  ): Observable<{
    serverLinkToken: string;
  }> {
    return this.httpClient.get(`${this.configService.getApiUrl()}/server/link/${id}`) as Observable<{
      serverLinkToken: string;
    }>;
  }

  updateThumbnail(id: string, thumbnail: any) {
    const form: FormData = new FormData();
    form.append('file', thumbnail);
    return this.httpClient.put(`${this.configService.getApiUrl()}/server/${id}/thumbnail`, form) as Observable<ServerModel>;
  }

  getThumbnail(id: string): Observable<string> {
    return this.httpClient
      .get(`${this.configService.getApiUrl()}/server/${id}/thumbnail`, {
        responseType: 'blob',
      })
      .pipe(map(blob => URL.createObjectURL(blob))) as Observable<string>;
  }
}
