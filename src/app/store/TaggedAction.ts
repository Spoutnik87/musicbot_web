import { v4 } from 'uuid';
import { Action } from './Action';

export class TaggedAction implements Action {
  type: string;
  private action: Action;
  private tag: string;

  constructor(action: Action, tag = v4()) {
    this.type = action.type;
    this.action = action;
    this.tag = tag;
  }

  get() {
    return {
      ...this.action,
      tag: this.tag,
    };
  }
}
