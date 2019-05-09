import { RoleModel } from './role.model';

export class UserModel {
  id: string;
  email: string;
  nickname: string;
  firstname: string;
  lastname: string;
  token?: string;
  role: RoleModel;
}
