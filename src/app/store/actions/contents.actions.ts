import { Action } from '@ngrx/store';
import { ContentModel } from 'src/app/models/content.model';

export const CLEAR_CONTENTS = 'CLEAR_CONTENTS';

export const FETCH_SERVER_CONTENTS = 'FETCH_SERVER_CONTENTS';
export const FETCH_SERVER_CONTENTS_SUCCESS = 'FETCH_SERVER_CONTENTS_SUCCESS';
export const FETCH_SERVER_CONTENTS_FAIL = 'FETCH_SERVER_CONTENTS_FAIL';

export const FETCH_CONTENT = 'FETCH_CONTENT';
export const FETCH_CONTENT_SUCCESS = 'FETCH_CONTENT_SUCCESS';
export const FETCH_CONTENT_FAIL = 'FETCH_CONTENT_FAIL';

export const CREATE_CONTENT = 'CREATE_CONTENT';
export const CREATE_CONTENT_SUCCESS = 'CREATE_CONTENT_SUCCESS';
export const CREATE_CONTENT_FAIL = 'CREATE_CONTENT_FAIL';

export const UPDATE_CONTENT = 'UPDATE_CONTENT';
export const UPDATE_CONTENT_SUCCESS = 'UPDATE_CONTENT_SUCCESS';
export const UPDATE_CONTENT_FAIL = 'UPDATE_CONTENT_FAIL';

export const DELETE_CONTENT = 'DELETE_CONTENT';
export const DELETE_CONTENT_SUCCESS = 'DELETE_CONTENT_SUCCESS';
export const DELETE_CONTENT_FAIL = 'DELETE_CONTENT_FAIL';

export const ADD_CONTENTS = 'ADD_CONTENTS';
export const ADD_CONTENT = 'ADD_CONTENT';

export class ClearContents implements Action {
  readonly type = CLEAR_CONTENTS;
}

export class FetchServerContents implements Action {
  readonly type = FETCH_SERVER_CONTENTS;
  payload: string;

  constructor(serverId: string) {
    this.payload = serverId;
  }
}

export class FetchServerContentsSuccess implements Action {
  readonly type = FETCH_SERVER_CONTENTS_SUCCESS;
  payload: {
    serverId: string;
    contents: ContentModel[];
  };

  constructor(serverId: string, contents: ContentModel[]) {
    this.payload = {
      serverId,
      contents,
    };
  }
}

export class FetchServerContentsFail implements Action {
  readonly type = FETCH_SERVER_CONTENTS_FAIL;
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

export class FetchContent implements Action {
  readonly type = FETCH_CONTENT;
  payload: string;

  constructor(id: string) {
    this.payload = id;
  }
}

export class FetchContentSuccess implements Action {
  readonly type = FETCH_CONTENT_SUCCESS;
  payload: ContentModel;

  constructor(content: ContentModel) {
    this.payload = content;
  }
}

export class FetchContentFail implements Action {
  readonly type = FETCH_CONTENT_FAIL;
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

export class CreateContent implements Action {
  readonly type = CREATE_CONTENT;
  payload: {
    serverId: string;
    groupId: string;
    name: string;
    categoryId: string;
    contentTypeId: string;
    thumbnail: any;
    media: any;
  };

  constructor(serverId: string, groupId: string, name: string, categoryId: string, contentTypeId: string, thumbnail: any, media: any) {
    this.payload = {
      serverId,
      groupId,
      name,
      categoryId,
      contentTypeId,
      thumbnail,
      media,
    };
  }
}

export class CreateContentSuccess implements Action {
  readonly type = CREATE_CONTENT_SUCCESS;
  payload: {
    content: ContentModel;
  };

  constructor(content: ContentModel) {
    this.payload = {
      content,
    };
  }
}

export class CreateContentFail implements Action {
  readonly type = CREATE_CONTENT_FAIL;
  payload: {
    error: any;
  };

  constructor(error: any) {
    this.payload = {
      error,
    };
  }
}

export class UpdateContent implements Action {
  readonly type = UPDATE_CONTENT;
  payload: {
    id: string;
    groupId: string;
    name: string;
    categoryId: string;
    contentTypeId: string;
  };

  constructor(id: string, groupId: string, name: string, categoryId: string, contentTypeId: string) {
    this.payload = {
      id,
      groupId,
      name,
      categoryId,
      contentTypeId,
    };
  }
}

export class UpdateContentSuccess implements Action {
  readonly type = UPDATE_CONTENT_SUCCESS;
  payload: ContentModel;

  constructor(content: ContentModel) {
    this.payload = content;
  }
}

export class UpdateContentFail implements Action {
  readonly type = UPDATE_CONTENT_FAIL;
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

export class DeleteContent implements Action {
  readonly type = DELETE_CONTENT;
  payload: {
    id: string;
  };

  constructor(id: string) {
    this.payload = {
      id,
    };
  }
}

export class DeleteContentSuccess implements Action {
  readonly type = DELETE_CONTENT_SUCCESS;
  payload: {
    id: string;
  };

  constructor(id: string) {
    this.payload = {
      id,
    };
  }
}

export class DeleteContentFail implements Action {
  readonly type = DELETE_CONTENT_FAIL;
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

export class AddContents implements Action {
  readonly type = ADD_CONTENTS;
  payload: ContentModel[];

  constructor(contents: ContentModel[]) {
    this.payload = contents;
  }
}

export class AddContent implements Action {
  readonly type = ADD_CONTENT;
  payload: ContentModel;

  constructor(content: ContentModel) {
    this.payload = content;
  }
}

export type ContentsAction =
  | ClearContents
  | FetchServerContents
  | FetchServerContentsSuccess
  | FetchServerContentsFail
  | FetchContent
  | FetchContentSuccess
  | FetchContentFail
  | CreateContent
  | CreateContentSuccess
  | CreateContentFail
  | UpdateContent
  | UpdateContentSuccess
  | UpdateContentFail
  | DeleteContent
  | DeleteContentSuccess
  | DeleteContentFail
  | AddContents
  | AddContent;
