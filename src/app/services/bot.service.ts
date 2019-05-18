import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerStatusModel } from '../models/server-status.model';
import { ConfigService } from './config.service';

@Injectable()
export class BotService {
  constructor(private configService: ConfigService, private httpClient: HttpClient) {}

  getStatus(serverId: string): Observable<ServerStatusModel> {
    return this.httpClient.get(`${this.configService.getApiUrl()}/bot/${serverId}`) as Observable<ServerStatusModel>;
  }

  postPlayCommand(contentId: string): Observable<ServerStatusModel> {
    return this.httpClient.post(`${this.configService.getApiUrl()}/bot/play/${contentId}`, null) as Observable<ServerStatusModel>;
  }

  postStopCommand(contentId: string): Observable<ServerStatusModel> {
    return this.httpClient.post(`${this.configService.getApiUrl()}/bot/stop/${contentId}`, null) as Observable<ServerStatusModel>;
  }

  postClearCommand(contentId: string): Observable<ServerStatusModel> {
    return this.httpClient.post(`${this.configService.getApiUrl()}/bot/clear/${contentId}`, null) as Observable<ServerStatusModel>;
  }

  postSetPositionCommand(contentId: string, position: number): Observable<ServerStatusModel> {
    return this.httpClient.post(`${this.configService.getApiUrl()}/bot/position/${contentId}`, {
      position,
    }) as Observable<ServerStatusModel>;
  }
}
