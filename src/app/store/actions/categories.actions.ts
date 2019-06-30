import { Action } from '@ngrx/store';
import { CategoryModel } from 'src/app/models/category.model';

export const CLEAR_CATEGORIES = 'CLEAR_CATEGORIES';

export const FETCH_SERVER_CATEGORIES = 'FETCH_SERVER_CATEGORIES';
export const FETCH_SERVER_CATEGORIES_SUCCESS = 'FETCH_SERVER_CATEGORIES_SUCCESS';
export const FETCH_SERVER_CATEGORIES_FAIL = 'FETCH_SERVER_CATEGORIES_FAIL';

export const FETCH_CATEGORY = 'FETCH_CATEGORY';
export const FETCH_CATEGORY_SUCCESS = 'FETCH_CATEGORY_SUCCESS';
export const FETCH_CATEGORY_FAIL = 'FETCH_CATEGORY_FAIL';

export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCCESS';
export const CREATE_CATEGORY_FAIL = 'CREATE_CATEGORY_FAIL';

export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS';
export const UPDATE_CATEGORY_FAIL = 'UPDATE_CATEGORY_FAIL';

export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_FAIL = 'DELETE_CATEGORY_FAIL';

export const FETCH_CATEGORY_THUMBNAIL = 'FETCH_CATEGORY_THUMBNAIL';
export const FETCH_CATEGORY_THUMBNAIL_SUCCESS = 'FETCH_CATEGORY_THUMBNAIL_SUCCESS';
export const FETCH_CATEGORY_THUMBNAIL_FAIL = 'FETCH_CATEGORY_THUMBNAIL_FAIL';

export const ADD_CATEGORIES = 'ADD_CATEGORIES';
export const ADD_CATEGORY = 'ADD_CATEGORY';

export class ClearCategories implements Action {
  readonly type = CLEAR_CATEGORIES;
}

export class FetchServerCategories implements Action {
  readonly type = FETCH_SERVER_CATEGORIES;
  payload: string;

  constructor(serverId: string) {
    this.payload = serverId;
  }
}

export class FetchServerCategoriesSuccess implements Action {
  readonly type = FETCH_SERVER_CATEGORIES_SUCCESS;
  payload: {
    serverId: string;
    categories: CategoryModel[];
  };

  constructor(serverId: string, categories: CategoryModel[]) {
    this.payload = {
      serverId,
      categories,
    };
  }
}

export class FetchServerCategoriesFail implements Action {
  readonly type = FETCH_SERVER_CATEGORIES_FAIL;
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

export class FetchCategory implements Action {
  readonly type = FETCH_CATEGORY;
  payload: string;

  constructor(id: string) {
    this.payload = id;
  }
}

export class FetchCategorySuccess implements Action {
  readonly type = FETCH_CATEGORY_SUCCESS;
  payload: CategoryModel;

  constructor(category: CategoryModel) {
    this.payload = category;
  }
}

export class FetchCategoryFail implements Action {
  readonly type = FETCH_CATEGORY_FAIL;
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

export class CreateCategory implements Action {
  readonly type = CREATE_CATEGORY;
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

export class CreateCategorySuccess implements Action {
  readonly type = CREATE_CATEGORY_SUCCESS;
  payload: {
    category: CategoryModel;
  };

  constructor(category: CategoryModel) {
    this.payload = {
      category,
    };
  }
}

export class CreateCategoryFail implements Action {
  readonly type = CREATE_CATEGORY_FAIL;
  payload: {
    error: any;
  };

  constructor(error: any) {
    this.payload = {
      error,
    };
  }
}

export class UpdateCategory implements Action {
  readonly type = UPDATE_CATEGORY;
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

export class UpdateCategorySuccess implements Action {
  readonly type = UPDATE_CATEGORY_SUCCESS;
  payload: CategoryModel;

  constructor(category: CategoryModel) {
    this.payload = category;
  }
}

export class UpdateCategoryFail implements Action {
  readonly type = UPDATE_CATEGORY_FAIL;
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

export class DeleteCategory implements Action {
  readonly type = DELETE_CATEGORY;
  payload: {
    id: string;
  };

  constructor(id: string) {
    this.payload = {
      id,
    };
  }
}

export class DeleteCategorySuccess implements Action {
  readonly type = DELETE_CATEGORY_SUCCESS;
  payload: {
    id: string;
  };

  constructor(id: string) {
    this.payload = {
      id,
    };
  }
}

export class DeleteCategoryFail implements Action {
  readonly type = DELETE_CATEGORY_FAIL;
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

export class FetchCategoryThumbnail implements Action {
  readonly type = FETCH_CATEGORY_THUMBNAIL;
  payload: string;

  constructor(id: string) {
    this.payload = id;
  }
}

export class FetchCategoryThumbnailSuccess implements Action {
  readonly type = FETCH_CATEGORY_THUMBNAIL_SUCCESS;
  payload: {
    id: string;
    thumbnailURL: string;
  };

  constructor(id: string, thumbnailURL: string) {
    this.payload = {
      id,
      thumbnailURL,
    };
  }
}

export class FetchCategoryThumbnailFail implements Action {
  readonly type = FETCH_CATEGORY_THUMBNAIL_FAIL;
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

export class AddCategories implements Action {
  readonly type = ADD_CATEGORIES;
  payload: CategoryModel[];

  constructor(categories: CategoryModel[]) {
    this.payload = categories;
  }
}

export class AddCategory implements Action {
  readonly type = ADD_CATEGORY;
  payload: CategoryModel;

  constructor(category: CategoryModel) {
    this.payload = category;
  }
}

export type CategoriesAction =
  | ClearCategories
  | FetchServerCategories
  | FetchServerCategoriesSuccess
  | FetchServerCategoriesFail
  | FetchCategory
  | FetchCategorySuccess
  | FetchCategoryFail
  | CreateCategory
  | CreateCategorySuccess
  | CreateCategoryFail
  | UpdateCategory
  | UpdateCategorySuccess
  | UpdateCategoryFail
  | DeleteCategory
  | DeleteCategorySuccess
  | DeleteCategoryFail
  | FetchCategoryThumbnail
  | FetchCategoryThumbnailSuccess
  | FetchCategoryThumbnailFail
  | AddCategories
  | AddCategory;
