import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { MessageModel } from 'src/app/models/message.model';

export interface MessagesState extends EntityState<MessageModel> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'messages' })
export class MessagesStore extends EntityStore<MessagesState, MessageModel> {
  constructor() {
    super();
  }
}
