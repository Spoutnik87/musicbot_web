import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserModel } from 'src/app/models/user.model';
import { ConfigService } from 'src/app/services';
import { AuthService } from '../auth/auth.service';
import { MessagesService } from '../messages/messages.service';
import { UsersStore } from './users.store';

@Injectable()
export class UsersService {
  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient,
    private usersStore: UsersStore,
    private messagesService: MessagesService,
    private authService: AuthService,
    private router: Router
  ) {}

  getAll(): void {
    this.usersStore.setLoading(true);
    this.httpClient.get(`${this.configService.getApiUrl()}/user/list`).subscribe(
      (users: UserModel[]) => {
        this.usersStore.set(
          users.map(user => ({
            id: user.id,
            user,
            loading: false,
            loaded: true,
            updating: false,
            updated: false,
          }))
        );
        this.usersStore.setLoading(false);
      },
      () => {
        this.usersStore.setLoading(false);
      }
    );
  }

  getById(id: string): void {
    this.usersStore.upsert(id, current => ({
      id,
      user: {
        ...(current && current.user),
        id,
      },
      loading: true,
      loaded: false,
      updating: false,
      updated: false,
    }));
    this.httpClient.get(`${this.configService.getApiUrl()}/user/${id}`).subscribe(
      (user: UserModel) => {
        this.usersStore.upsert(user.id, current => ({
          id: user.id,
          user: {
            ...(current && current.user),
            id: user.id,
            ...user,
          },
          loading: false,
          loaded: true,
          updating: false,
          updated: false,
        }));
      },
      () => {
        this.usersStore.upsert(id, current => ({
          loading: false,
          loaded: false,
        }));
      }
    );
  }

  getAuthenticatedUser() {
    const authenticatedUserId = this.authService.getId();
    this.usersStore.upsert(authenticatedUserId, current => ({
      id: authenticatedUserId,
      user: {
        ...(current && current.user),
        authenticatedUserId,
      },
      loading: true,
      loaded: false,
      updating: false,
      updated: false,
    }));
    this.httpClient.get(`${this.configService.getApiUrl()}/user`).subscribe(
      (user: UserModel) => {
        this.usersStore.upsert(user.id, current => ({
          id: user.id,
          user: {
            ...(current && current.user),
            id: user.id,
            ...user,
          },
          loading: false,
          loaded: true,
          updating: false,
          updated: false,
        }));
      },
      () => {
        this.usersStore.upsert(authenticatedUserId, current => ({
          loading: false,
          loaded: false,
        }));
        this.authService.disconnect();
      }
    );
  }

  create(email: string, nickname: string, password: string, firstname: string, lastname: string): Observable<string> {
    return this.httpClient
      .post(`${this.configService.getApiUrl()}/user`, {
        email,
        nickname,
        password,
        firstname,
        lastname,
      })
      .pipe(
        map((user: UserModel) => {
          this.usersStore.upsert(user.id, () => ({
            ...user,
            loading: true,
            loaded: false,
            updating: false,
            updated: false,
          }));
          return user.id;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  signIn(email: string, password: string): void {
    this.httpClient
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
      .subscribe(
        resp => {
          const response = resp as HttpResponse<any>;
          const user = response.body as UserModel;
          this.usersStore.upsert(user.id, current => ({
            id: user.id,
            user: {
              ...(current && current.user),
              id: user.id,
              ...user,
            },
            loading: false,
            loaded: true,
            updating: false,
            updated: false,
          }));
          user.token = response.headers.get('Authorization').substr(7);
          this.authService.signIn(user);
          this.router.navigateByUrl('');
        },
        () => {
          this.messagesService.sendErrorMessage("L'adresse mail ou le mot de passe est incorrecte.");
        }
      );
  }

  disconnect() {
    this.delete(this.authService.getId());
    this.authService.disconnect();
  }

  update(id: string, name: string): void {
    this.usersStore.upsert(id, current => ({
      id,
      updating: true,
      updated: false,
    }));
    this.httpClient
      .put(`${this.configService.getApiUrl()}/user/${id}`, {
        name,
      })
      .subscribe(
        (user: UserModel) => {
          this.usersStore.upsert(user.id, () => ({
            ...user,
            loading: false,
            loaded: false,
            updating: true,
            updated: false,
          }));
        },
        () => {
          this.usersStore.upsert(id, current => ({
            id,
            updating: false,
            updated: false,
          }));
        }
      );
  }

  delete(id: string): void {
    this.httpClient.delete(`${this.configService.getApiUrl()}/user/${id}`).subscribe(
      () => {
        this.usersStore.remove(id);
      },
      () => {}
    );
  }

  getThumbnail(id: string): void {
    this.httpClient
      .get(`${this.configService.getApiUrl()}/user/${id}/thumbnail`, {
        responseType: 'blob',
      })
      .pipe(map(blob => URL.createObjectURL(blob)))
      .subscribe(
        thumbnailURL => {
          this.usersStore.upsert(id, current => ({
            id,
            user: {
              ...(current && current.user),
              id,
              thumbnailURL,
            },
          }));
        },
        () => {}
      );
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
