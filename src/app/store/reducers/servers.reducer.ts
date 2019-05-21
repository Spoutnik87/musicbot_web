import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {
  BotAction,
  CLEAR_QUEUE_COMMAND,
  CLEAR_QUEUE_COMMAND_FAIL,
  CLEAR_QUEUE_COMMAND_SUCCESS,
  CLEAR_STORE,
  FETCH_SERVER_STATUS,
  FETCH_SERVER_STATUS_SUCCESS,
  PLAY_CONTENT_COMMAND,
  PLAY_CONTENT_COMMAND_FAIL,
  PLAY_CONTENT_COMMAND_SUCCESS,
  StoreAction,
  SET_POSITION_COMMAND,
  SET_POSITION_COMMAND_FAIL,
  SET_POSITION_COMMAND_SUCCESS,
  STOP_CONTENT_COMMAND,
  STOP_CONTENT_COMMAND_FAIL,
  STOP_CONTENT_COMMAND_SUCCESS,
} from '../actions';
import {
  ADD_SERVER,
  ADD_SERVERS,
  CLEAR_SERVERS,
  CREATE_SERVER_SUCCESS,
  DELETE_SERVER_SUCCESS,
  FETCH_SERVER,
  FETCH_SERVER_FAIL,
  FETCH_SERVER_SUCCESS,
  FETCH_SERVERS,
  FETCH_SERVERS_FAIL,
  FETCH_SERVERS_SUCCESS,
  ServersAction,
  SET_SERVER_STATUS,
  UPDATE_SERVER,
  UPDATE_SERVER_FAIL,
  UPDATE_SERVER_SUCCESS,
} from '../actions/servers.actions';
import { ServerModel } from './../../models/server.model';

export interface IServersState extends EntityState<IServerState> {
  loading: boolean;
  loaded: boolean;
}
export interface IServerState {
  server: ServerModel;
  loading: boolean;
  loaded: boolean;
  updating: boolean;
  updated: boolean;
  commandLoading: boolean;
  commandLoaded: boolean;
}

export const serversAdapter: EntityAdapter<IServerState> = createEntityAdapter<IServerState>({
  selectId: serverState => serverState.server.id,
});

const initialState: IServersState = serversAdapter.getInitialState({
  loading: false,
  loaded: false,
});

export function serversReducer(state = initialState, action: ServersAction | StoreAction | BotAction): IServersState {
  switch (action.type) {
    case FETCH_SERVERS:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case FETCH_SERVERS_SUCCESS:
      return {
        ...serversAdapter.addAll(
          action.payload.map(server => ({
            server,
            loading: false,
            loaded: true,
            updating: false,
            updated: false,
            commandLoading: false,
            commandLoaded: false,
          })),
          state
        ),
        loading: false,
        loaded: true,
      };
    case FETCH_SERVERS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    case FETCH_SERVER:
      return serversAdapter.upsertOne(
        {
          server: {
            ...(state.entities[action.payload] && state.entities[action.payload].server),
            id: action.payload,
          },
          loading: true,
          loaded: false,
          updating: false,
          updated: false,
          commandLoading: false,
          commandLoaded: false,
        },
        state
      );
    case FETCH_SERVER_SUCCESS:
      return serversAdapter.upsertOne(
        {
          ...state.entities[action.payload.id],
          server: action.payload,
          loading: false,
          loaded: true,
        },
        state
      );
    case FETCH_SERVER_FAIL:
      return serversAdapter.upsertOne(
        {
          ...state.entities[action.payload.id],
          loading: false,
          loaded: false,
        },
        state
      );
    case CREATE_SERVER_SUCCESS:
      return serversAdapter.upsertOne(
        {
          server: action.payload.server,
          loading: false,
          loaded: true,
          updating: false,
          updated: false,
          commandLoading: false,
          commandLoaded: false,
        },
        state
      );
    case UPDATE_SERVER:
      return serversAdapter.upsertOne(
        {
          ...state.entities[action.payload.id],
          updating: true,
          updated: false,
        },
        state
      );
    case UPDATE_SERVER_SUCCESS:
      return serversAdapter.upsertOne(
        {
          ...state.entities[action.payload.id],
          server: action.payload,
          updating: false,
          updated: true,
        },
        state
      );
    case UPDATE_SERVER_FAIL:
      return serversAdapter.upsertOne(
        {
          ...state.entities[action.payload.id],
          updating: false,
          updated: false,
        },
        state
      );
    case DELETE_SERVER_SUCCESS:
      return serversAdapter.removeOne(action.payload.id, state);
    case ADD_SERVERS:
      return serversAdapter.upsertMany(
        action.payload.map(server => ({
          server,
          loading: false,
          loaded: true,
          updating: false,
          updated: false,
          commandLoading: false,
          commandLoaded: false,
        })),
        state
      );
    case ADD_SERVER:
      return serversAdapter.upsertOne(
        {
          server: action.payload,
          loading: false,
          loaded: true,
          updating: false,
          updated: false,
          commandLoading: false,
          commandLoaded: false,
        },
        state
      );
    case CLEAR_STORE:
    case CLEAR_SERVERS:
      return serversAdapter.removeAll(state);
    case FETCH_SERVER_STATUS_SUCCESS:
      return serversAdapter.upsertOne(
        {
          ...state.entities[action.payload.serverId],
          server: {
            ...(state.entities[action.payload.serverId] && state.entities[action.payload.serverId].server),
            id: action.payload.serverId,
            status: action.payload.status,
          },
        },
        state
      );
    case PLAY_CONTENT_COMMAND:
    case STOP_CONTENT_COMMAND:
    case SET_POSITION_COMMAND:
      return serversAdapter.upsertOne(
        {
          ...state.entities[action.payload.serverId],
          commandLoading: true,
          commandLoaded: false,
        },
        state
      );
    case CLEAR_QUEUE_COMMAND:
      return serversAdapter.upsertOne(
        {
          ...state.entities[action.payload],
          commandLoading: true,
          commandLoaded: false,
        },
        state
      );
    case PLAY_CONTENT_COMMAND_SUCCESS:
    case STOP_CONTENT_COMMAND_SUCCESS:
    case CLEAR_QUEUE_COMMAND_SUCCESS:
    case SET_POSITION_COMMAND_SUCCESS:
      return serversAdapter.upsertOne(
        {
          ...state.entities[action.payload.serverId],
          commandLoading: false,
          commandLoaded: true,
        },
        state
      );
    case PLAY_CONTENT_COMMAND_FAIL:
    case STOP_CONTENT_COMMAND_FAIL:
    case CLEAR_QUEUE_COMMAND_FAIL:
    case SET_POSITION_COMMAND_FAIL:
      return serversAdapter.upsertOne(
        {
          ...state.entities[action.payload.serverId],
          commandLoading: false,
          commandLoaded: false,
        },
        state
      );
    case SET_SERVER_STATUS:
      return serversAdapter.upsertOne(
        {
          ...state.entities[action.payload.id],
          server: {
            ...(state.entities[action.payload.id] && state.entities[action.payload.id].server),
            id: action.payload.id,
            status: action.payload.status,
          },
        },
        state
      );
    default:
      return state;
  }
}

export const getServers = (state: IServersState) =>
  serversAdapter
    .getSelectors()
    .selectAll(state)
    .map(serverState => serverState.server);
export const getServersLoading = (state: IServersState) => state.loading;
export const getServersLoaded = (state: IServersState) => state.loaded;
