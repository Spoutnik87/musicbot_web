import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {
  ADD_ROLE,
  ADD_ROLES,
  CLEAR_ROLES,
  FETCH_ROLE,
  FETCH_ROLE_FAIL,
  FETCH_ROLE_SUCCESS,
  FETCH_ROLES,
  FETCH_ROLES_FAIL,
  FETCH_ROLES_SUCCESS,
  RolesAction,
} from '../actions/roles.actions';
import { RoleModel } from './../../models/role.model';

export interface IRolesState extends EntityState<IRoleState> {
  loading: boolean;
  loaded: boolean;
}
export interface IRoleState {
  role: RoleModel;
  loading: boolean;
  loaded: boolean;
}

export const rolesAdapter: EntityAdapter<IRoleState> = createEntityAdapter<IRoleState>({
  selectId: roleState => roleState.role.id,
});

const initialState: IRolesState = rolesAdapter.getInitialState({
  loading: false,
  loaded: false,
});

export function rolesReducer(state = initialState, action: RolesAction): IRolesState {
  switch (action.type) {
    case FETCH_ROLES:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case FETCH_ROLES_SUCCESS:
      return {
        ...rolesAdapter.addAll(
          action.payload.map(role => ({
            role,
            loading: false,
            loaded: true,
          })),
          state
        ),
        loading: false,
        loaded: true,
      };
    case FETCH_ROLES_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    case FETCH_ROLE:
      return rolesAdapter.upsertOne(
        {
          role: {
            ...(state.entities[action.payload] && state.entities[action.payload].role),
            id: action.payload,
          },
          loading: true,
          loaded: false,
        },
        state
      );
    case FETCH_ROLE_SUCCESS:
      return rolesAdapter.upsertOne(
        {
          ...state.entities[action.payload.id],
          role: action.payload,
          loading: false,
          loaded: true,
        },
        state
      );
    case FETCH_ROLE_FAIL:
      return rolesAdapter.upsertOne(
        {
          ...state.entities[action.payload.id],
          loading: false,
          loaded: false,
        },
        state
      );
    case ADD_ROLES:
      return rolesAdapter.upsertMany(
        action.payload.map(role => ({
          role,
          loading: false,
          loaded: true,
        })),
        state
      );
    case ADD_ROLE:
      return rolesAdapter.upsertOne(
        {
          role: action.payload,
          loading: false,
          loaded: true,
        },
        state
      );
    case CLEAR_ROLES:
      return rolesAdapter.removeAll(state);
    default:
      return state;
  }
}

export const getRoles = (state: IRolesState) =>
  rolesAdapter
    .getSelectors()
    .selectAll(state)
    .map(roleState => roleState.role);
export const getRolesLoading = (state: IRolesState) => state.loading;
export const getRolesLoaded = (state: IRolesState) => state.loaded;
