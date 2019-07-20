import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { map } from 'rxjs/operators';
import { RolesState, RolesStore, RoleState } from './roles.store';

@Injectable({ providedIn: 'root' })
export class RolesQuery extends QueryEntity<RolesState, RoleState> {
  roles$ = this.selectAll().pipe(map(rolesState => rolesState.map(roleState => roleState.role)));

  constructor(protected store: RolesStore) {
    super(store);
  }

  selectRole(id: string) {
    return this.selectEntity(id).pipe(map(roleState => roleState.role));
  }
}
