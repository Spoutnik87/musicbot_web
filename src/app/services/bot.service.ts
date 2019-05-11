import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable()
export class BotService {
  constructor(private configService: ConfigService, private httpClient: HttpClient) {}
}
