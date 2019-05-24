import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { ConfigService } from './config.service';

@Injectable()
export class UserService {
  constructor(private configService: ConfigService, private httpClient: HttpClient) {}

  signIn(email: string, password: string): Observable<UserModel> {
    return this.httpClient
      .post(
        `${this.configService.getApiUrl()}/login`,
        {
          email,
          password,
        },
        {
          observe: 'response',
          headers: {
            'Access-Control-Allow-Headers': 'Authorization',
          },
        }
      )
      .pipe(
        map(resp => {
          const response = resp as HttpResponse<any>;
          const user = response.body as UserModel;
          user.token = response.headers.get('Authorization').substr(7);
          return user;
        })
      ) as Observable<UserModel>;
  }

  register(email: string, nickname: string, password: string, firstname: string, lastname: string): Observable<UserModel> {
    return this.httpClient.post(`${this.configService.getApiUrl()}/user`, {
      email,
      nickname,
      password,
      firstname,
      lastname,
    }) as Observable<UserModel>;
  }

  update(id: string, nickname: string) {
    return this.httpClient.put(`${this.configService.getApiUrl()}/user/${id}`, {
      nickname,
    }) as Observable<UserModel>;
  }

  getSession(): Observable<UserModel> {
    return this.httpClient.get(`${this.configService.getApiUrl()}/user`) as Observable<UserModel>;
  }

  getById(id: string): Observable<UserModel> {
    return this.httpClient.get(`${this.configService.getApiUrl()}/user/${id}`) as Observable<UserModel>;
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.configService.getApiUrl()}/user/${id}`) as Observable<any>;
  }

  /**
   * Generate a token that must be entered in the discord server that the user want to join.
   */
  getServerJoinToken(): Observable<{
    serverJoinToken: string;
  }> {
    return this.httpClient.get(`${this.configService.getApiUrl()}/user/serverJoinToken`) as Observable<{
      serverJoinToken: string;
    }>;
  }
}
