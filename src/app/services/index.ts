import { AuthService } from './auth.service';
import { BotService } from './bot.service';
import { CategoryService } from './category.service';
import { ConfigService } from './config.service';
import { ContentService } from './content.service';
import { GroupService } from './group.service';
import { RoleService } from './role.service';
import { ServerService } from './server.service';
import { UserService } from './user.service';

export const services: any[] = [
  AuthService,
  ConfigService,
  UserService,
  RoleService,
  ServerService,
  GroupService,
  ContentService,
  CategoryService,
  BotService,
];

export * from './auth.service';
export * from './config.service';
export * from './user.service';
export * from './role.service';
export * from './server.service';
export * from './group.service';
export * from './content.service';
export * from './category.service';
export * from './bot.service';
