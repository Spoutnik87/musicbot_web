import { createSelector } from '@ngrx/store';
import { IAppState } from '../reducers';
import * as fromMessages from '../reducers/messages.reducer';

export const getMessagesState = (state: IAppState) => state.messages;

export const getMessages = createSelector(
  getMessagesState,
  fromMessages.getMessages
);

export const getSuccessMessages = createSelector(
  getMessagesState,
  fromMessages.getSuccessMessages
);

export const getErrorMessages = createSelector(
  getMessagesState,
  fromMessages.getErrorMessages
);

export const getInfoMessages = createSelector(
  getMessagesState,
  fromMessages.getInfoMessages
);
