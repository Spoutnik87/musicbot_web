import { Params, RouterStateSnapshot } from '@angular/router';
import { routerReducer, RouterReducerState, RouterStateSerializer } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from 'src/environments/environment';
import * as fromCategories from './categories.reducer';
import * as fromContents from './contents.reducer';
import * as fromGroups from './groups.reducer';
import * as fromMessages from './messages.reducer';
import * as fromRoles from './roles.reducer';
import * as fromServers from './servers.reducer';
import * as fromUsers from './users.reducer';

export interface IRouterState {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface IAppState {
  router: RouterReducerState<IRouterState>;
  messages: fromMessages.IMessagesState;
  users: fromUsers.IUsersState;
  roles: fromRoles.IRolesState;
  groups: fromGroups.IGroupsState;
  servers: fromServers.IServersState;
  contents: fromContents.IContentsState;
  categories: fromCategories.ICategoriesState;
}

export const reducers: ActionReducerMap<IAppState> = {
  router: routerReducer,
  messages: fromMessages.messagesReducer,
  users: fromUsers.usersReducer,
  roles: fromRoles.rolesReducer,
  groups: fromGroups.groupsReducer,
  servers: fromServers.serversReducer,
  contents: fromContents.contentsReducer,
  categories: fromCategories.categoriesReducer,
};

export const metaReducers: MetaReducer<IAppState>[] = !environment.production ? [storeFreeze] : [];

export class CustomSerializer implements RouterStateSerializer<IRouterState> {
  serialize(routerState: RouterStateSnapshot): IRouterState {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams },
    } = routerState;
    const { params } = route;

    return { url, params, queryParams };
  }
}
