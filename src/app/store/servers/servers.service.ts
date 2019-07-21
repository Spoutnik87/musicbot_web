import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ServerStatusModel } from 'src/app/models/server-status.model';
import { ServerModel } from '../../models/server.model';
import { ConfigService } from '../../services';
import { ServersStore } from './servers.store';

@Injectable()
export class ServersService {
  constructor(private configService: ConfigService, private httpClient: HttpClient, private serversStore: ServersStore) {}

  getAll(): void {
    this.serversStore.setLoading(true);
    this.httpClient.get(`${this.configService.getApiUrl()}/server/list`).subscribe(
      (servers: ServerModel[]) => {
        this.serversStore.set(
          servers.map(server => ({
            id: server.id,
            server,
            loading: false,
            loaded: true,
            updating: false,
            updated: false,
            commandLoading: false,
            commandLoaded: false,
          }))
        );
        this.serversStore.setLoading(false);
      },
      () => {
        this.serversStore.setLoading(false);
      }
    );
  }

  getByUser(userId: string): void {
    this.serversStore.setLoading(true);
    this.httpClient.get(`${this.configService.getApiUrl()}/server/list/${userId}`).subscribe(
      (servers: ServerModel[]) => {
        this.serversStore.set(
          servers.map(server => ({
            id: server.id,
            server,
            loading: false,
            loaded: true,
            updating: false,
            updated: false,
            commandLoading: false,
            commandLoaded: false,
          }))
        );
        this.serversStore.setLoading(false);
      },
      () => {
        this.serversStore.setLoading(false);
      }
    );
  }

  getById(id: string): void {
    this.serversStore.upsert(id, current => ({
      id,
      server: {
        ...(current && current.server),
        id,
      },
      loading: true,
      loaded: false,
      updating: false,
      updated: false,
      commandLoading: false,
      commandLoaded: false,
    }));
    this.httpClient.get(`${this.configService.getApiUrl()}/server/${id}`).subscribe(
      (server: ServerModel) => {
        this.serversStore.upsert(server.id, current => ({
          id: server.id,
          server: {
            ...(current && current.server),
            id: server.id,
            ...server,
          },
          loading: false,
          loaded: true,
          updating: false,
          updated: false,
          commandLoading: false,
          commandLoaded: false,
        }));
      },
      () => {
        this.serversStore.upsert(id, current => ({
          loading: false,
          loaded: false,
        }));
      }
    );
  }

  create(name: string): Observable<string> {
    return this.httpClient
      .post(`${this.configService.getApiUrl()}/server`, {
        name,
      })
      .pipe(
        map((server: ServerModel) => {
          this.serversStore.upsert(server.id, () => ({
            ...server,
            loading: true,
            loaded: false,
            updating: false,
            updated: false,
            commandLoading: false,
            commandLoaded: false,
          }));
          return server.id;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  update(id: string, name: string): void {
    this.serversStore.upsert(id, current => ({
      id,
      updating: true,
      updated: false,
    }));
    this.httpClient
      .put(`${this.configService.getApiUrl()}/server/${id}`, {
        name,
      })
      .subscribe(
        (server: ServerModel) => {
          this.serversStore.upsert(server.id, () => ({
            ...server,
            loading: false,
            loaded: false,
            updating: true,
            updated: false,
            commandLoading: false,
            commandLoaded: false,
          }));
        },
        () => {
          this.serversStore.upsert(id, current => ({
            id,
            updating: false,
            updated: false,
          }));
        }
      );
  }

  delete(id: string): void {
    this.httpClient.delete(`${this.configService.getApiUrl()}/server/${id}`).subscribe(
      () => {
        this.serversStore.remove(id);
      },
      () => {}
    );
  }

  getStatus(id: string) {
    this.httpClient.get(`${this.configService.getApiUrl()}/bot/${id}`).subscribe(
      (status: ServerStatusModel) => {
        this.serversStore.upsert(id, current => ({
          ...current,
          server: {
            ...current.server,
            status,
          },
        }));
      },
      () => {}
    );
  }

  sendPlayContentCommand(id: string, contentId: string) {
    this.serversStore.upsert(id, current => ({
      id,
      commandLoading: true,
      commandLoaded: false,
    }));
    this.httpClient.post(`${this.configService.getApiUrl()}/bot/play/${contentId}`, null).subscribe(
      (status: ServerStatusModel) => {
        this.serversStore.upsert(id, current => ({
          id,
          server: {
            ...current.server,
            status,
          },
          commandLoading: false,
          commandLoaded: true,
        }));
      },
      () => {
        this.serversStore.upsert(id, current => ({
          id,
          commandLoading: false,
          commandLoaded: false,
        }));
      }
    );
  }

  sendStopContentCommand(id: string, contentId: string, uid: string) {
    this.serversStore.upsert(id, current => ({
      id,
      commandLoading: true,
      commandLoaded: false,
    }));
    this.httpClient
      .post(`${this.configService.getApiUrl()}/bot/stop/${contentId}`, {
        uid,
      })
      .subscribe(
        (status: ServerStatusModel) => {
          this.serversStore.upsert(id, current => ({
            id,
            server: {
              ...current.server,
              status,
            },
            commandLoading: false,
            commandLoaded: true,
          }));
        },
        () => {
          this.serversStore.upsert(id, current => ({
            id,
            commandLoading: false,
            commandLoaded: false,
          }));
        }
      );
  }

  sendSetPositionCommand(id: string, contentId: string, position: number) {
    this.serversStore.upsert(id, current => ({
      id,
      commandLoading: true,
      commandLoaded: false,
    }));
    this.httpClient
      .post(`${this.configService.getApiUrl()}/bot/position/${contentId}`, {
        position,
      })
      .subscribe(
        (status: ServerStatusModel) => {
          this.serversStore.upsert(id, current => ({
            id,
            server: {
              ...current.server,
              status,
            },
            commandLoading: false,
            commandLoaded: true,
          }));
        },
        () => {
          this.serversStore.upsert(id, current => ({
            id,
            commandLoading: false,
            commandLoaded: false,
          }));
        }
      );
  }

  sendClearQueueCommand(id: string) {
    this.serversStore.upsert(id, current => ({
      id,
      commandLoading: true,
      commandLoaded: false,
    }));
    this.httpClient.post(`${this.configService.getApiUrl()}/bot/clear/${id}`, null).subscribe(
      (status: ServerStatusModel) => {
        this.serversStore.upsert(id, current => ({
          id,
          server: {
            ...current.server,
            status,
          },
          commandLoading: false,
          commandLoaded: true,
        }));
      },
      () => {
        this.serversStore.upsert(id, current => ({
          id,
          commandLoading: false,
          commandLoaded: false,
        }));
      }
    );
  }

  sendPauseContentCommand(id: string) {
    this.serversStore.upsert(id, current => ({
      id,
      commandLoading: true,
      commandLoaded: false,
    }));
    this.httpClient.post(`${this.configService.getApiUrl()}/bot/pause/${id}`, null).subscribe(
      (status: ServerStatusModel) => {
        this.serversStore.upsert(id, current => ({
          id,
          server: {
            ...current.server,
            status,
          },
          commandLoading: false,
          commandLoaded: true,
        }));
      },
      () => {
        this.serversStore.upsert(id, current => ({
          id,
          commandLoading: false,
          commandLoaded: false,
        }));
      }
    );
  }

  sendResumeContentCommand(id: string) {
    this.serversStore.upsert(id, current => ({
      id,
      commandLoading: true,
      commandLoaded: false,
    }));
    this.httpClient.post(`${this.configService.getApiUrl()}/bot/resume/${id}`, null).subscribe(
      (status: ServerStatusModel) => {
        this.serversStore.upsert(id, current => ({
          id,
          server: {
            ...current.server,
            status,
          },
          commandLoading: false,
          commandLoaded: true,
        }));
      },
      () => {
        this.serversStore.upsert(id, current => ({
          id,
          commandLoading: false,
          commandLoaded: false,
        }));
      }
    );
  }

  setServerStatus(id: string, result: ServerStatusModel) {
    this.serversStore.upsert(id, current => ({
      id,
      server: {
        ...current.server,
        status: result,
      },
      commandLoading: false,
      commandLoaded: true,
    }));
  }

  addServer(server: ServerModel) {
    this.serversStore.upsert(server.id, {
      id: server.id,
      server,
      loading: false,
      loaded: true,
      updating: false,
      updated: false,
      commandLoading: false,
      commandLoaded: false,
    });
  }

  addServers(servers: ServerModel[]) {
    this.serversStore.upsertMany(
      servers.map(server => ({
        id: server.id,
        server,
        loading: false,
        loaded: true,
        updating: false,
        updated: false,
        commandLoading: false,
        commandLoaded: false,
      }))
    );
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

  getThumbnail(id: string): void {
    this.httpClient
      .get(`${this.configService.getApiUrl()}/server/${id}/thumbnail`, {
        responseType: 'blob',
      })
      .pipe(map(blob => URL.createObjectURL(blob)))
      .subscribe(
        thumbnailURL => {
          this.serversStore.upsert(id, current => ({
            id,
            server: {
              ...(current && current.server),
              id,
              thumbnailURL,
            },
          }));
        },
        () => {}
      );
  }
}
