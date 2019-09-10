import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { ContentStatusModel } from '../models/content-status.model';
import { ServerStatusModel } from '../models/server-status.model';
import { ContentsQuery } from '../store/contents/contents.query';
import { ServersService } from '../store/servers/servers.service';
import { UsersQuery } from '../store/users/users.query';

const addContentToQueue = (state: ServerStatusModel, content: ContentStatusModel): ServerStatusModel => {
  if (state == null) {
    return null;
  }
  const result: ServerStatusModel = {
    ...state,
    queue: [...state.queue, content],
  };
  return result;
};

const removeContentFromQueue = (state: ServerStatusModel, contentId: string): ServerStatusModel => {
  if (state == null) {
    return null;
  }
  const result: ServerStatusModel = {
    ...state,
    queue: state.queue.filter(content => content.id !== contentId),
  };
  return result;
};

const playContent = (state: ServerStatusModel, content: ContentStatusModel): ServerStatusModel => {
  if (state == null) {
    return null;
  }
  if (state.playing != null) {
    return addContentToQueue(state, content);
  } else {
    const result: ServerStatusModel = {
      ...state,
      playing: content,
    };
    return result;
  }
};

const playNextContent = (state: ServerStatusModel): ServerStatusModel => {
  if (state == null) {
    return null;
  }
  if (state.queue.length > 0) {
    const contentState: ContentStatusModel = {
      ...state.queue[0],
      startTime: Date.now(),
    };
    const result: ServerStatusModel = {
      ...state,
      queue: state.queue.filter((content, index) => index !== 0),
      playing: contentState,
    };
    return result;
  } else {
    const result: ServerStatusModel = {
      ...state,
      playing: null,
    };
    return result;
  }
};

const clearQueue = (state: ServerStatusModel): ServerStatusModel => {
  if (state == null) {
    return null;
  }
  const result: ServerStatusModel = {
    ...state,
    queue: [],
  };
  return result;
};

const setPlayingContentPosition = (state: ServerStatusModel, position: number): ServerStatusModel => {
  if (state == null) {
    return null;
  }
  const result: ServerStatusModel = {
    ...state,
    playing: {
      ...state.playing,
      position,
    },
  };
  return result;
};

const pause = (state: ServerStatusModel) => {
  if (state == null) {
    return null;
  }
  const result: ServerStatusModel = {
    ...state,
    playing: {
      ...state.playing,
      paused: true,
    },
  };
  return result;
};

const resume = (state: ServerStatusModel) => {
  if (state == null) {
    return null;
  }
  const result: ServerStatusModel = {
    ...state,
    playing: {
      ...state.playing,
      paused: false,
    },
  };
  return result;
};

@Injectable()
export class ServerStatusHelper {
  constructor(private serversService: ServersService, private contentsQuery: ContentsQuery, private usersQuery: UsersQuery) {}

  playContent(id: string, status: ServerStatusModel, contentId: string) {
    if (status == null) {
      status = {
        date: new Date().getTime(),
        id,
        queue: [],
      };
    }
    forkJoin([this.contentsQuery.selectContent(contentId).pipe(first()), this.usersQuery.authenticatedUser$.pipe(first())])
      .pipe(
        map(([content, authenticatedUser]) => {
          return {
            id: content.id,
            name: content.name,
            duration: content.duration,
            startTime: Date.now(),
            initiator: {
              id: authenticatedUser.id,
              nickname: authenticatedUser.nickname,
            },
          } as ContentStatusModel;
        }),
        map(contentStatus => playContent(status, contentStatus))
      )
      .subscribe(
        serverStatus => {
          this.serversService.setServerStatus(id, serverStatus);
        },
        error => {}
      );
  }

  playNextContent(id: string, status: ServerStatusModel) {
    const result = playNextContent(status);
    this.serversService.setServerStatus(id, result);
  }

  clearQueue(id: string, status: ServerStatusModel) {
    if (status == null) {
      status = {
        date: new Date().getTime(),
        id,
        queue: [],
      };
    }
    const result: ServerStatusModel = {
      date: new Date().getTime(),
      id,
      queue: [],
    };
    this.serversService.setServerStatus(id, result);
  }

  setPosition(id: string, status: ServerStatusModel, position: number) {
    const result = setPlayingContentPosition(status, position);
    this.serversService.setServerStatus(id, result);
  }

  pause(id: string, status: ServerStatusModel) {
    const result = pause(status);
    this.serversService.setServerStatus(id, result);
  }

  resume(id: string, status: ServerStatusModel) {
    const result = resume(status);
    this.serversService.setServerStatus(id, result);
  }
}
