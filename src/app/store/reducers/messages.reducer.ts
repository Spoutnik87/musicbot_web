import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { CLEAR_STORE, StoreAction } from '../actions';
import { MessageModel } from './../../models/message.model';
import {
  CLEAR_MESSAGES,
  MessagesAction,
  REMOVE_MESSAGE,
  SEND_ERROR_MESSAGE,
  SEND_ERROR_MESSAGES,
  SEND_INFO_MESSAGE,
  SEND_INFO_MESSAGES,
  SEND_SUCCESS_MESSAGE,
  SEND_SUCCESS_MESSAGES,
} from './../actions/messages.actions';

export interface IMessagesState extends EntityState<MessageModel> {}

export const messagesAdapter: EntityAdapter<MessageModel> = createEntityAdapter<MessageModel>();

const initialState: IMessagesState = messagesAdapter.getInitialState();

export function messagesReducer(state = initialState, action: MessagesAction | StoreAction): IMessagesState {
  let message: MessageModel;
  let messages: MessageModel[];
  switch (action.type) {
    case SEND_SUCCESS_MESSAGE:
      message = {
        id: action.payload.id,
        type: 'success',
        message: action.payload.message,
      };
      return action.payload.clear ? messagesAdapter.addAll([message], state) : messagesAdapter.addOne(message, state);
    case SEND_SUCCESS_MESSAGES:
      messages = action.payload.messages.map(m => {
        message = {
          id: m.id,
          message: m.message,
          type: 'success',
        };
        return message;
      });
      return action.payload.clear ? messagesAdapter.addAll(messages, state) : messagesAdapter.addMany(messages, state);
    case SEND_ERROR_MESSAGE:
      message = {
        id: action.payload.id,
        type: 'danger',
        message: action.payload.message,
      };
      return action.payload.clear ? messagesAdapter.addAll([message], state) : messagesAdapter.addOne(message, state);
    case SEND_ERROR_MESSAGES:
      messages = action.payload.messages.map(m => {
        message = {
          id: m.id,
          message: m.message,
          type: 'danger',
        };
        return message;
      });
      return action.payload.clear ? messagesAdapter.addAll(messages, state) : messagesAdapter.addMany(messages, state);
    case SEND_INFO_MESSAGE:
      message = {
        id: action.payload.id,
        type: 'info',
        message: action.payload.message,
      };
      return action.payload.clear ? messagesAdapter.addAll([message], state) : messagesAdapter.addOne(message, state);
    case SEND_INFO_MESSAGES:
      messages = action.payload.messages.map(m => {
        message = {
          id: m.id,
          message: m.message,
          type: 'info',
        };
        return message;
      });
      return action.payload.clear ? messagesAdapter.addAll(messages, state) : messagesAdapter.addMany(messages, state);
    case REMOVE_MESSAGE:
      return messagesAdapter.removeOne(action.payload, state);
    case CLEAR_STORE:
    case CLEAR_MESSAGES:
      return messagesAdapter.removeAll(state);
    default:
      return state;
  }
}

export const getMessages = (state: IMessagesState) => messagesAdapter.getSelectors().selectAll(state);
export const getSuccessMessages = (state: IMessagesState) => getMessages(state).filter(message => message.type === 'success');
export const getErrorMessages = (state: IMessagesState) => getMessages(state).filter(message => message.type === 'danger');
export const getInfoMessages = (state: IMessagesState) => getMessages(state).filter(message => message.type === 'info');
