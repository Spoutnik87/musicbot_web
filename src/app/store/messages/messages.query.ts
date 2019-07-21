import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { MessageModel } from 'src/app/models/message.model';
import { MessagesState, MessagesStore } from './messages.store';

@Injectable({ providedIn: 'root' })
export class MessagesQuery extends QueryEntity<MessagesState, MessageModel> {
  infoMessages$ = this.getAll().filter(message => message.type === 'info');
  successMessages$ = this.getAll().filter(message => message.type === 'success');
  errorMessages$ = this.getAll().filter(message => message.type === 'danger');

  constructor(protected store: MessagesStore) {
    super(store);
  }
}
