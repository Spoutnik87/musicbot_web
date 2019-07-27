import { Injectable } from '@angular/core';
import { v4 } from 'uuid';
import { MessagesStore } from './messages.store';

@Injectable()
export class MessagesService {
  constructor(private messagesStore: MessagesStore) {}

  sendInfoMessage(message: string, clear = false): void {
    if (clear) {
      this.messagesStore.reset();
    }
    this.messagesStore.add({
      id: v4(),
      message,
      type: 'info',
    });
  }

  sendSuccessMessage(message: string, clear = false): void {
    if (clear) {
      this.messagesStore.reset();
    }
    this.messagesStore.add({
      id: v4(),
      message,
      type: 'success',
    });
  }

  sendErrorMessage(message: string, clear = false): void {
    if (clear) {
      this.messagesStore.reset();
    }
    this.messagesStore.add({
      id: v4(),
      message,
      type: 'danger',
    });
  }

  sendInfoMessages(messages: string[], clear = false): void {
    if (clear) {
      this.messagesStore.reset();
    }
    this.messagesStore.add(
      messages.map(message => ({
        id: v4(),
        message,
        type: 'info',
      }))
    );
  }

  sendSuccessMessages(messages: string[], clear = false): void {
    if (clear) {
      this.messagesStore.reset();
    }
    this.messagesStore.add(
      messages.map(message => ({
        id: v4(),
        message,
        type: 'success',
      }))
    );
  }

  sendErrorMessages(messages: string[], clear = false): void {
    if (clear) {
      this.messagesStore.reset();
    }
    this.messagesStore.add(
      messages.map(message => ({
        id: v4(),
        message,
        type: 'danger',
      }))
    );
  }

  clearMessages() {
    this.messagesStore.set([]);
  }
}
