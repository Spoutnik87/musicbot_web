import { Permission } from '../enums/Permission';

export interface GroupModel {
  id: string;
  name: string;
  serverId: string;
  member?: boolean;
  permissions?: Permission[];
}
