import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {
  ADD_USER,
  ADD_USERS,
  AUTHENTICATED_USER_ALREADY_CACHED,
  CLEAR_USERS,
  DELETE_USER_SUCCESS,
  DISCONNECT_USER,
  FETCH_AUTHENTICATED_USER,
  FETCH_AUTHENTICATED_USER_FAIL,
  FETCH_AUTHENTICATED_USER_SUCCESS,
  REGISTER_USER,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  SIGNIN_USER,
  SIGNIN_USER_FAIL,
  SIGNIN_USER_SUCCESS,
  UsersAction,
  UPDATE_USER,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
  USER_ALREADY_CACHED,
} from '../actions/users.actions';
import { UserModel } from './../../models/user.model';

const TEMPORARY_AUTHENTICATED_USER_ID = 'TMP';

export interface IUsersState extends EntityState<IUserState> {
  loading: boolean;
  loaded: boolean;
  authenticatedUserId: string;
}
export interface IUserState {
  user: UserModel;
  loading: boolean;
  loaded: boolean;
  updatedAt: number;
  updating: boolean;
  updated: boolean;
}

export const usersAdapter: EntityAdapter<IUserState> = createEntityAdapter<IUserState>({
  selectId: userState => userState.user.id,
});

const initialState: IUsersState = usersAdapter.getInitialState({
  loading: false,
  loaded: false,
  authenticatedUserId: TEMPORARY_AUTHENTICATED_USER_ID,
});

export function usersReducer(state = initialState, action: UsersAction): IUsersState {
  switch (action.type) {
    case DISCONNECT_USER:
      return {
        ...usersAdapter.removeOne(state.authenticatedUserId, state),
        authenticatedUserId: TEMPORARY_AUTHENTICATED_USER_ID,
      };
    case REGISTER_USER:
      return {
        ...usersAdapter.upsertOne(
          {
            user: {
              ...(state.entities[state.authenticatedUserId] && state.entities[state.authenticatedUserId].user),
              id: state.authenticatedUserId,
            },
            loading: true,
            loaded: false,
            updatedAt: undefined,
            updating: false,
            updated: false,
          },
          state
        ),
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...usersAdapter.upsertOne(
          {
            ...state.entities[state.authenticatedUserId],
            loading: false,
            loaded: true,
            updatedAt: undefined,
          },
          state
        ),
      };
    case REGISTER_USER_FAIL:
      return {
        ...usersAdapter.upsertOne(
          {
            ...state.entities[state.authenticatedUserId],
            loading: false,
            loaded: true,
            updatedAt: undefined,
          },
          state
        ),
      };
    case SIGNIN_USER:
      return {
        ...usersAdapter.upsertOne(
          {
            user: {
              ...(state.entities[state.authenticatedUserId] && state.entities[state.authenticatedUserId].user),
              id: state.authenticatedUserId,
            },
            loading: true,
            loaded: false,
            updatedAt: undefined,
            updating: false,
            updated: false,
          },
          state
        ),
      };
    case SIGNIN_USER_SUCCESS:
      return {
        ...usersAdapter.upsertOne(
          {
            user: action.payload,
            loading: false,
            loaded: true,
            updatedAt: Date.now(),
            updating: false,
            updated: false,
          },
          usersAdapter.removeOne(state.authenticatedUserId, state)
        ),
        authenticatedUserId: action.payload.id,
      };
    case SIGNIN_USER_FAIL:
      return {
        ...usersAdapter.upsertOne(
          {
            ...state.entities[state.authenticatedUserId],
            loading: false,
            loaded: false,
            updatedAt: undefined,
          },
          state
        ),
      };
    case FETCH_AUTHENTICATED_USER:
      return {
        ...usersAdapter.upsertOne(
          {
            ...state.entities[state.authenticatedUserId],
            user: {
              ...(state.entities[state.authenticatedUserId] && state.entities[state.authenticatedUserId].user),
              id: state.authenticatedUserId,
            },
            loading: true,
            loaded: false,
          },
          state
        ),
      };
    case FETCH_AUTHENTICATED_USER_SUCCESS:
      return {
        ...usersAdapter.upsertOne(
          {
            user: action.payload,
            loading: false,
            loaded: true,
            updatedAt: Date.now(),
            updating: false,
            updated: false,
          },
          usersAdapter.removeOne(state.authenticatedUserId, state)
        ),
        authenticatedUserId: action.payload.id,
      };
    case FETCH_AUTHENTICATED_USER_FAIL:
      return {
        ...usersAdapter.upsertOne(
          {
            ...state.entities[state.authenticatedUserId],
            loading: false,
            loaded: false,
            updatedAt: undefined,
          },
          state
        ),
      };
    case ADD_USERS:
      return usersAdapter.upsertMany(
        action.payload.map(user => ({
          user,
          loading: false,
          loaded: true,
          updatedAt: Date.now(),
          updating: false,
          updated: false,
        })),
        state
      );
    case ADD_USER:
      return usersAdapter.upsertOne(
        {
          user: action.payload,
          loading: false,
          loaded: true,
          updatedAt: Date.now(),
          updating: false,
          updated: false,
        },
        state
      );
    case AUTHENTICATED_USER_ALREADY_CACHED:
      return {
        ...usersAdapter.upsertOne(
          {
            ...state.entities[state.authenticatedUserId],
            loading: false,
            loaded: true,
          },
          state
        ),
      };
    case USER_ALREADY_CACHED:
      return {
        ...usersAdapter.upsertOne(
          {
            ...state.entities[action.payload],
            loading: false,
            loaded: true,
          },
          state
        ),
      };
    case UPDATE_USER:
      return usersAdapter.upsertOne(
        {
          ...state.entities[action.payload.id],
          updating: true,
          updated: false,
        },
        state
      );
    case UPDATE_USER_SUCCESS:
      return usersAdapter.upsertOne(
        {
          ...state.entities[action.payload.id],
          user: action.payload,
          updating: false,
          updated: true,
        },
        state
      );
    case UPDATE_USER_FAIL:
      return usersAdapter.upsertOne(
        {
          ...state.entities[action.payload.id],
          updating: false,
          updated: false,
        },
        state
      );
    case DELETE_USER_SUCCESS:
      return usersAdapter.removeOne(action.payload.id, state);
    case CLEAR_USERS:
      return usersAdapter.removeAll(state);
    default:
      return state;
  }
}

export const getUsers = (state: IUsersState) =>
  usersAdapter
    .getSelectors()
    .selectAll(state)
    .map(userState => userState.user);
export const getUsersLoading = (state: IUsersState) => state.loading;
export const getUsersLoaded = (state: IUsersState) => state.loaded;
