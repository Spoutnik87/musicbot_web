import { Action } from '@ngrx/store';

export class MessagesAction implements Action {
  type: string;
  private action: Action;

  constructor(action: Action, successMessages: string[], failureMessages: string[], reset = true) {
    this.type = action.type;
    this.action = action;
  }
}
