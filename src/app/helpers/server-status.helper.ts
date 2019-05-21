import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { forkJoin } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { ContentStatusModel } from '../models/content-status.model';
import { ServerStatusModel } from '../models/server-status.model';
import { getAuthenticatedUser, getContent, IAppState, SetServerStatus } from '../store';

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
    return state;
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

@Injectable()
export class ServerStatusHelper {
  constructor(private store: Store<IAppState>) {}

  playContent(id: string, status: ServerStatusModel, contentId: string) {
    if (status == null) {
      status = {
        id,
        queue: [],
      };
    }
    forkJoin([this.store.select(getContent, { id: contentId }).pipe(first()), this.store.select(getAuthenticatedUser).pipe(first())])
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
          this.store.dispatch(new SetServerStatus(id, serverStatus));
        },
        error => {
          console.log(error);
        }
      );
  }

  playNextContent(id: string, status: ServerStatusModel) {
    const result = playNextContent(status);
    this.store.dispatch(new SetServerStatus(id, result));
  }

  clearQueue(id: string, status: ServerStatusModel) {
    if (status == null) {
      status = {
        id,
        queue: [],
      };
    }
    const result: ServerStatusModel = {
      id,
      queue: [],
    };
    this.store.dispatch(new SetServerStatus(id, result));
  }

  setPosition(id: string, status: ServerStatusModel, position: number) {
    const result = setPlayingContentPosition(status, position);
    this.store.dispatch(new SetServerStatus(id, result));
  }
}
