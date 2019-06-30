import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { CLEAR_STORE, StoreAction } from '../actions';
import {
  ADD_GROUP,
  ADD_GROUPS,
  CLEAR_GROUPS,
  CREATE_GROUP_SUCCESS,
  DELETE_GROUP_SUCCESS,
  FETCH_GROUP,
  FETCH_GROUP_FAIL,
  FETCH_GROUP_SUCCESS,
  FETCH_GROUP_THUMBNAIL_SUCCESS,
  FETCH_SERVER_GROUPS,
  FETCH_SERVER_GROUPS_FAIL,
  FETCH_SERVER_GROUPS_SUCCESS,
  GroupsAction,
  UPDATE_GROUP,
  UPDATE_GROUP_FAIL,
  UPDATE_GROUP_SUCCESS,
} from '../actions/groups.actions';
import { GroupModel } from './../../models/group.model';

export interface IGroupsState extends EntityState<IGroupState> {
  loading: boolean;
  loaded: boolean;
}
export interface IGroupState {
  group: GroupModel;
  loading: boolean;
  loaded: boolean;
  updating: boolean;
  updated: boolean;
}

export const groupsAdapter: EntityAdapter<IGroupState> = createEntityAdapter<IGroupState>({
  selectId: groupState => groupState.group.id,
});

const initialState: IGroupsState = groupsAdapter.getInitialState({
  loading: false,
  loaded: false,
});

export function groupsReducer(state = initialState, action: GroupsAction | StoreAction): IGroupsState {
  switch (action.type) {
    case FETCH_SERVER_GROUPS:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case FETCH_SERVER_GROUPS_SUCCESS:
      return {
        ...groupsAdapter.addAll(
          action.payload.groups.map(group => ({
            group,
            loading: false,
            loaded: true,
            updating: false,
            updated: false,
          })),
          state
        ),
        loading: false,
        loaded: true,
      };
    case FETCH_SERVER_GROUPS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    case FETCH_GROUP:
      return groupsAdapter.upsertOne(
        {
          group: {
            ...(state.entities[action.payload] && state.entities[action.payload].group),
            id: action.payload,
          },
          loading: true,
          loaded: false,
          updating: false,
          updated: false,
        },
        state
      );
    case FETCH_GROUP_SUCCESS:
      return groupsAdapter.upsertOne(
        {
          ...state.entities[action.payload.id],
          group: {
            ...(state.entities[action.payload.id] && state.entities[action.payload.id].group),
            ...action.payload,
          },
          loading: false,
          loaded: true,
        },
        state
      );
    case FETCH_GROUP_FAIL:
      return groupsAdapter.upsertOne(
        {
          ...state.entities[action.payload.id],
          loading: false,
          loaded: false,
        },
        state
      );
    case CREATE_GROUP_SUCCESS:
      return groupsAdapter.upsertOne(
        {
          group: action.payload.group,
          loading: false,
          loaded: true,
          updating: false,
          updated: false,
        },
        state
      );
    case UPDATE_GROUP:
      return groupsAdapter.upsertOne(
        {
          ...state.entities[action.payload.id],
          updating: true,
          updated: false,
        },
        state
      );
    case UPDATE_GROUP_SUCCESS:
      return groupsAdapter.upsertOne(
        {
          ...state.entities[action.payload.id],
          group: action.payload,
          updating: false,
          updated: true,
        },
        state
      );
    case UPDATE_GROUP_FAIL:
      return groupsAdapter.upsertOne(
        {
          ...state.entities[action.payload.id],
          updating: false,
          updated: false,
        },
        state
      );
    case DELETE_GROUP_SUCCESS:
      return groupsAdapter.removeOne(action.payload.id, state);
    case FETCH_GROUP_THUMBNAIL_SUCCESS:
      return groupsAdapter.upsertOne(
        {
          ...state.entities[action.payload.id],
          group: {
            ...(state.entities[action.payload.id] && state.entities[action.payload.id].group),
            id: action.payload.id,
            thumbnailURL: action.payload.thumbnailURL,
          },
        },
        state
      );
    case ADD_GROUPS:
      return groupsAdapter.upsertMany(
        action.payload.map(group => ({
          group,
          loading: false,
          loaded: true,
          updating: false,
          updated: false,
        })),
        state
      );
    case ADD_GROUP:
      return groupsAdapter.upsertOne(
        {
          group: action.payload,
          loading: false,
          loaded: true,
          updating: false,
          updated: false,
        },
        state
      );
    case CLEAR_STORE:
    case CLEAR_GROUPS:
      return groupsAdapter.removeAll(state);
    default:
      return state;
  }
}

export const getGroups = (state: IGroupsState) =>
  groupsAdapter
    .getSelectors()
    .selectAll(state)
    .map(groupState => groupState.group);
export const getGroupsLoading = (state: IGroupsState) => state.loading;
export const getGroupsLoaded = (state: IGroupsState) => state.loaded;
