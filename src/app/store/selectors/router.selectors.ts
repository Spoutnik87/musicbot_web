import { createSelector } from '@ngrx/store';
import { IAppState } from '../reducers';

export const getRouterState = (state: IAppState) => state.router;

export const getRouter = createSelector(
  getRouterState,
  routerState => routerState.state
);
