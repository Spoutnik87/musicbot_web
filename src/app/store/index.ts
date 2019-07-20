import { AppService } from './app/app.service';
import { AuthService } from './auth/auth.service';
import { CategoriesService } from './categories/categories.service';
import { ContentTypesService } from './content-types/content-types.service';
import { ContentsService } from './contents/contents.service';
import { GroupsService } from './groups/groups.service';
import { MessagesService } from './messages/messages.service';
import { RolesService } from './roles/roles.service';
import { ServersService } from './servers/servers.service';
import { UsersService } from './users/users.service';

export const akitaServices = [
  AppService,
  CategoriesService,
  ContentTypesService,
  ContentsService,
  GroupsService,
  MessagesService,
  RolesService,
  ServersService,
  UsersService,
  AuthService,
];
