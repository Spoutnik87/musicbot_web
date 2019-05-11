import { Action } from '@ngrx/store';
import { ServerModel } from 'src/app/models/server.model';

export const CLEAR_SERVERS = 'CLEAR_SERVERS';

export const FETCH_SERVERS = 'FETCH_SERVERS';
export const FETCH_SERVERS_SUCCESS = 'FETCH_SERVERS_SUCCESS';
export const FETCH_SERVERS_FAIL = 'FETCH_SERVERS_FAIL';

export const FETCH_SERVER = 'FETCH_SERVER';
export const FETCH_SERVER_SUCCESS = 'FETCH_SERVER_SUCCESS';
export const FETCH_SERVER_FAIL = 'FETCH_SERVER_FAIL';

export const CREATE_SERVER = 'CREATE_SERVER';
export const CREATE_SERVER_SUCCESS = 'CREATE_SERVER_SUCCESS';
export const CREATE_SERVER_FAIL = 'CREATE_SERVER_FAIL';

export const UPDATE_SERVER = 'UPDATE_SERVER';
export const UPDATE_SERVER_SUCCESS = 'UPDATE_SERVER_SUCCESS';
export const UPDATE_SERVER_FAIL = 'UPDATE_SERVER_FAIL';

export const DELETE_SERVER = 'DELETE_SERVER';
export const DELETE_SERVER_SUCCESS = 'DELETE_SERVER_SUCCESS';
export const DELETE_SERVER_FAIL = 'DELETE_SERVER_FAIL';

export const ADD_SERVERS = 'ADD_SERVERS';
export const ADD_SERVER = 'ADD_SERVER';

export class ClearServers implements Action {
  readonly type = CLEAR_SERVERS;
}

export class FetchServers implements Action {
  readonly type = FETCH_SERVERS;
}

export class FetchServersSuccess implements Action {
  readonly type = FETCH_SERVERS_SUCCESS;
  payload: ServerModel[];

  constructor(servers: ServerModel[]) {
    this.payload = servers;
  }
}

export class FetchServersFail implements Action {
  readonly type = FETCH_SERVERS_FAIL;
  payload: any;

  constructor(error: any) {
    this.payload = error;
  }
}

export class FetchServer implements Action {
  readonly type = FETCH_SERVER;
  payload: string;

  constructor(id: string) {
    this.payload = id;
  }
}

export class FetchServerSuccess implements Action {
  readonly type = FETCH_SERVER_SUCCESS;
  payload: ServerModel;

  constructor(server: ServerModel) {
    this.payload = server;
  }
}

export class FetchServerFail implements Action {
  readonly type = FETCH_SERVER_FAIL;
  payload: {
    id: string;
    error: any;
  };

  constructor(id: string, error: any) {
    this.payload = {
      id,
      error,
    };
  }
}

export class CreateServer implements Action {
  readonly type = CREATE_SERVER;
  payload: {
    name: string;
  };

  constructor(name: string) {
    this.payload = {
      name,
    };
  }
}

export class CreateServerSuccess implements Action {
  readonly type = CREATE_SERVER_SUCCESS;
  payload: {
    server: ServerModel;
  };

  constructor(server: ServerModel) {
    this.payload = {
      server,
    };
  }
}

export class CreateServerFail implements Action {
  readonly type = CREATE_SERVER_FAIL;
  payload: {
    error: any;
  };

  constructor(error: any) {
    this.payload = {
      error,
    };
  }
}

export class UpdateServer implements Action {
  readonly type = UPDATE_SERVER;
  payload: {
    id: string;
    name: string;
  };

  constructor(id: string, name: string) {
    this.payload = {
      id,
      name,
    };
  }
}

export class UpdateServerSuccess implements Action {
  readonly type = UPDATE_SERVER_SUCCESS;
  payload: ServerModel;

  constructor(server: ServerModel) {
    this.payload = server;
  }
}

export class UpdateServerFail implements Action {
  readonly type = UPDATE_SERVER_FAIL;
  payload: {
    id: string;
    error: any;
  };

  constructor(id: string, error: any) {
    this.payload = {
      id,
      error,
    };
  }
}

export class DeleteServer implements Action {
  readonly type = DELETE_SERVER;
  payload: {
    id: string;
  };

  constructor(id: string) {
    this.payload = {
      id,
    };
  }
}

export class DeleteServerSuccess implements Action {
  readonly type = DELETE_SERVER_SUCCESS;
  payload: {
    id: string;
  };

  constructor(id: string) {
    this.payload = {
      id,
    };
  }
}

export class DeleteServerFail implements Action {
  readonly type = DELETE_SERVER_FAIL;
  payload: {
    id: string;
    error: any;
  };

  constructor(id: string, error: any) {
    this.payload = {
      id,
      error,
    };
  }
}

export class AddServers implements Action {
  readonly type = ADD_SERVERS;
  payload: ServerModel[];

  constructor(servers: ServerModel[]) {
    this.payload = servers;
  }
}

export class AddServer implements Action {
  readonly type = ADD_SERVER;
  payload: ServerModel;

  constructor(server: ServerModel) {
    this.payload = server;
  }
}

export type ServersAction =
  | ClearServers
  | FetchServers
  | FetchServersSuccess
  | FetchServersFail
  | FetchServer
  | FetchServerSuccess
  | FetchServerFail
  | CreateServer
  | CreateServerSuccess
  | CreateServerFail
  | UpdateServer
  | UpdateServerSuccess
  | UpdateServerFail
  | DeleteServer
  | DeleteServerSuccess
  | DeleteServerFail
  | AddServers
  | AddServer;