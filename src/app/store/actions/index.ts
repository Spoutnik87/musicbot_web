import { Action } from '@ngrx/store';

export * from './users.actions';
export * from './servers.actions';
export * from './roles.actions';
export * from './groups.actions';
export * from './contents.actions';
export * from './categories.actions';
export * from './bot.actions';

export const CLEAR_STORE = 'CLEAR_STORE';

export class ClearStore implements Action {
  readonly type = CLEAR_STORE;
}

export type StoreAction = ClearStore;
