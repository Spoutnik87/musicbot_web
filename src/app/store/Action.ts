import { Action } from '@ngrx/store';

export interface Action extends Action {
  get(): Action;
}
