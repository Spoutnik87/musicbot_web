import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
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
    const params = new HttpParams({
      fromObject: {
        email,
        nickname,
        password,
        firstname,
        lastname,
      },
    });
    return this.httpClient.post(`${this.configService.getApiUrl()}/user`, undefined, {
      params,
    }) as Observable<UserModel>;
  }

  update(id: string, nickname: string) {
    const params = new HttpParams({
      fromObject: {
        nickname,
      },
    });
    return this.httpClient.put(`${this.configService.getApiUrl()}/user/${id}`, undefined, {
      params,
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
}
