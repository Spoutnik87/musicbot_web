import { Action } from '@ngrx/store';
import { GroupModel } from 'src/app/models/group.model';

export const CLEAR_GROUPS = 'CLEAR_GROUPS';

export const FETCH_SERVER_GROUPS = 'FETCH_SERVER_GROUPS';
export const FETCH_SERVER_GROUPS_SUCCESS = 'FETCH_SERVER_GROUPS_SUCCESS';
export const FETCH_SERVER_GROUPS_FAIL = 'FETCH_SERVER_GROUPS_FAIL';

export const FETCH_GROUP = 'FETCH_GROUP';
export const FETCH_GROUP_SUCCESS = 'FETCH_GROUP_SUCCESS';
export const FETCH_GROUP_FAIL = 'FETCH_GROUP_FAIL';

export const CREATE_GROUP = 'CREATE_GROUP';
export const CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS';
export const CREATE_GROUP_FAIL = 'CREATE_GROUP_FAIL';

export const UPDATE_GROUP = 'UPDATE_GROUP';
export const UPDATE_GROUP_SUCCESS = 'UPDATE_GROUP_SUCCESS';
export const UPDATE_GROUP_FAIL = 'UPDATE_GROUP_FAIL';

export const DELETE_GROUP = 'DELETE_GROUP';
export const DELETE_GROUP_SUCCESS = 'DELETE_GROUP_SUCCESS';
export const DELETE_GROUP_FAIL = 'DELETE_GROUP_FAIL';

export const ADD_GROUPS = 'ADD_GROUPS';
export const ADD_GROUP = 'ADD_GROUP';

export class ClearGroups implements Action {
  readonly type = CLEAR_GROUPS;
}

export class FetchServerGroups implements Action {
  readonly type = FETCH_SERVER_GROUPS;
  payload: string;

  constructor(serverId: string) {
    this.payload = serverId;
  }
}

export class FetchServerGroupsSuccess implements Action {
  readonly type = FETCH_SERVER_GROUPS_SUCCESS;
  payload: {
    serverId: string;
    groups: GroupModel[];
  };

  constructor(serverId: string, groups: GroupModel[]) {
    this.payload = {
      serverId,
      groups,
    };
  }
}

export class FetchServerGroupsFail implements Action {
  readonly type = FETCH_SERVER_GROUPS_FAIL;
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

export class FetchGroup implements Action {
  readonly type = FETCH_GROUP;
  payload: string;

  constructor(id: string) {
    this.payload = id;
  }
}

export class FetchGroupSuccess implements Action {
  readonly type = FETCH_GROUP_SUCCESS;
  payload: GroupModel;

  constructor(group: GroupModel) {
    this.payload = group;
  }
}

export class FetchGroupFail implements Action {
  readonly type = FETCH_GROUP_FAIL;
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

export class CreateGroup implements Action {
  readonly type = CREATE_GROUP;
  payload: {
    serverId: string;
    name: string;
  };

  constructor(serverId: string, name: string) {
    this.payload = {
      serverId,
      name,
    };
  }
}

export class CreateGroupSuccess implements Action {
  readonly type = CREATE_GROUP_SUCCESS;
  payload: {
    group: GroupModel;
  };

  constructor(group: GroupModel) {
    this.payload = {
      group,
    };
  }
}

export class CreateGroupFail implements Action {
  readonly type = CREATE_GROUP_FAIL;
  payload: {
    error: any;
  };

  constructor(error: any) {
    this.payload = {
      error,
    };
  }
}

export class UpdateGroup implements Action {
  readonly type = UPDATE_GROUP;
  payload: {
    id: string;
    serverId: string;
    name: string;
  };

  constructor(id: string, serverId: string, name: string) {
    this.payload = {
      id,
      serverId,
      name,
    };
  }
}

export class UpdateGroupSuccess implements Action {
  readonly type = UPDATE_GROUP_SUCCESS;
  payload: GroupModel;

  constructor(group: GroupModel) {
    this.payload = group;
  }
}

export class UpdateGroupFail implements Action {
  readonly type = UPDATE_GROUP_FAIL;
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

export class DeleteGroup implements Action {
  readonly type = DELETE_GROUP;
  payload: {
    id: string;
  };

  constructor(id: string) {
    this.payload = {
      id,
    };
  }
}

export class DeleteGroupSuccess implements Action {
  readonly type = DELETE_GROUP_SUCCESS;
  payload: {
    id: string;
  };

  constructor(id: string) {
    this.payload = {
      id,
    };
  }
}

export class DeleteGroupFail implements Action {
  readonly type = DELETE_GROUP_FAIL;
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

export class AddGroups implements Action {
  readonly type = ADD_GROUPS;
  payload: GroupModel[];

  constructor(groups: GroupModel[]) {
    this.payload = groups;
  }
}

export class AddGroup implements Action {
  readonly type = ADD_GROUP;
  payload: GroupModel;

  constructor(group: GroupModel) {
    this.payload = group;
  }
}

export type GroupsAction =
  | ClearGroups
  | FetchServerGroups
  | FetchServerGroupsSuccess
  | FetchServerGroupsFail
  | FetchGroup
  | FetchGroupSuccess
  | FetchGroupFail
  | CreateGroup
  | CreateGroupSuccess
  | CreateGroupFail
  | UpdateGroup
  | UpdateGroupSuccess
  | UpdateGroupFail
  | DeleteGroup
  | DeleteGroupSuccess
  | DeleteGroupFail
  | AddGroups
  | AddGroup;
