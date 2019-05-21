import { Action } from '@ngrx/store';
import { ServerStatusModel } from 'src/app/models/server-status.model';

export const FETCH_SERVER_STATUS = 'FETCH_SERVER_STATUS';
export const FETCH_SERVER_STATUS_SUCCESS = 'FETCH_SERVER_STATUS_SUCCESS';
export const FETCH_SERVER_STATUS_FAIL = 'FETCH_SERVER_STATUS_FAIL';

export const PLAY_CONTENT_COMMAND = 'PLAY_CONTENT_COMMAND';
export const PLAY_CONTENT_COMMAND_SUCCESS = 'PLAY_CONTENT_COMMAND_SUCCESS';
export const PLAY_CONTENT_COMMAND_FAIL = 'PLAY_CONTENT_COMMAND_FAIL';

export const STOP_CONTENT_COMMAND = 'STOP_CONTENT_COMMAND';
export const STOP_CONTENT_COMMAND_SUCCESS = 'STOP_CONTENT_COMMAND_SUCCESS';
export const STOP_CONTENT_COMMAND_FAIL = 'STOP_CONTENT_COMMAND_FAIL';

export const CLEAR_QUEUE_COMMAND = 'CLEAR_QUEUE_COMMAND';
export const CLEAR_QUEUE_COMMAND_SUCCESS = 'CLEAR_QUEUE_COMMAND_SUCCESS';
export const CLEAR_QUEUE_COMMAND_FAIL = 'CLEAR_QUEUE_COMMAND_FAIL';

export const SET_POSITION_COMMAND = 'SET_POSITION_COMMAND';
export const SET_POSITION_COMMAND_SUCCESS = 'SET_POSITION_COMMAND_SUCCESS';
export const SET_POSITION_COMMAND_FAIL = 'SET_POSITION_COMMAND_FAIL';

export class FetchServerStatus implements Action {
  readonly type = FETCH_SERVER_STATUS;
  payload: string;

  constructor(serverId: string) {
    this.payload = serverId;
  }
}

export class FetchServerStatusSuccess implements Action {
  readonly type = FETCH_SERVER_STATUS_SUCCESS;
  payload: {
    serverId: string;
    status: ServerStatusModel;
  };

  constructor(serverId: string, status: ServerStatusModel) {
    this.payload = {
      serverId,
      status,
    };
  }
}

export class FetchServerStatusFail implements Action {
  readonly type = FETCH_SERVER_STATUS_FAIL;
  payload: {
    serverId;
    error;
  };

  constructor(serverId: string, error: any) {
    this.payload = {
      serverId,
      error,
    };
  }
}

export class PlayContentCommand implements Action {
  readonly type = PLAY_CONTENT_COMMAND;
  payload: {
    serverId: string;
    contentId: string;
  };

  constructor(serverId: string, contentId: string) {
    this.payload = {
      serverId,
      contentId,
    };
  }
}

export class PlayContentCommandSuccess implements Action {
  readonly type = PLAY_CONTENT_COMMAND_SUCCESS;
  payload: {
    serverId: string;
    status: ServerStatusModel;
  };

  constructor(serverId: string, status: ServerStatusModel) {
    this.payload = {
      serverId,
      status,
    };
  }
}

export class PlayContentCommandFail implements Action {
  readonly type = PLAY_CONTENT_COMMAND_FAIL;
  payload: {
    serverId: string;
    contentId: string;
    error: any;
  };

  constructor(serverId: string, contentId: string, error: any) {
    this.payload = {
      serverId,
      contentId,
      error,
    };
  }
}

export class StopContentCommand implements Action {
  readonly type = STOP_CONTENT_COMMAND;
  payload: {
    serverId: string;
    contentId: string;
  };

  constructor(serverId: string, contentId: string) {
    this.payload = {
      serverId,
      contentId,
    };
  }
}

export class StopContentCommandSuccess implements Action {
  readonly type = STOP_CONTENT_COMMAND_SUCCESS;
  payload: {
    serverId: string;
    status: ServerStatusModel;
  };

  constructor(serverId: string, status: ServerStatusModel) {
    this.payload = {
      serverId,
      status,
    };
  }
}

export class StopContentCommandFail implements Action {
  readonly type = STOP_CONTENT_COMMAND_FAIL;
  payload: {
    serverId: string;
    contentId: string;
    error: any;
  };

  constructor(serverId: string, contentId: string, error: any) {
    this.payload = {
      serverId,
      contentId,
      error,
    };
  }
}

export class ClearQueueCommand implements Action {
  readonly type = CLEAR_QUEUE_COMMAND;
  payload: string;

  constructor(serverId: string) {
    this.payload = serverId;
  }
}

export class ClearQueueCommandSuccess implements Action {
  readonly type = CLEAR_QUEUE_COMMAND_SUCCESS;
  payload: {
    serverId: string;
    status: ServerStatusModel;
  };

  constructor(serverId: string, status: ServerStatusModel) {
    this.payload = {
      serverId,
      status,
    };
  }
}

export class ClearQueueCommandFail implements Action {
  readonly type = CLEAR_QUEUE_COMMAND_FAIL;
  payload: {
    serverId: string;
    error: any;
  };

  constructor(serverId: string, error: any) {
    this.payload = {
      serverId,
      error,
    };
  }
}

export class SetPositionCommand implements Action {
  readonly type = SET_POSITION_COMMAND;
  payload: {
    serverId: string;
    contentId: string;
    position: number;
  };

  constructor(serverId: string, contentId: string, position: number) {
    this.payload = {
      serverId,
      contentId,
      position,
    };
  }
}

export class SetPositionCommandSuccess implements Action {
  readonly type = SET_POSITION_COMMAND_SUCCESS;
  payload: {
    serverId: string;
    status: ServerStatusModel;
  };

  constructor(serverId: string, status: ServerStatusModel) {
    this.payload = {
      serverId,
      status,
    };
  }
}

export class SetPositionCommandFail implements Action {
  readonly type = SET_POSITION_COMMAND_FAIL;
  payload: {
    serverId: string;
    contentId: string;
    error: any;
  };

  constructor(serverId: string, contentId: string, error: any) {
    this.payload = {
      serverId,
      contentId,
      error,
    };
  }
}

export type BotAction =
  | FetchServerStatus
  | FetchServerStatusSuccess
  | FetchServerStatusFail
  | PlayContentCommand
  | PlayContentCommandSuccess
  | PlayContentCommandFail
  | StopContentCommand
  | StopContentCommandSuccess
  | StopContentCommandFail
  | ClearQueueCommand
  | ClearQueueCommandSuccess
  | ClearQueueCommandFail
  | SetPositionCommand
  | SetPositionCommandSuccess
  | SetPositionCommandFail;
