import { BotEffects } from './bot.effects';
import { CategoriesEffects } from './categories.effects';
import { ContentsEffects } from './contents.effects';
import { GroupsEffects } from './groups.effects';
import { RolesEffects } from './roles.effects';
import { ServersEffects } from './servers.effects';
import { UsersEffects } from './users.effects';

export const effects: any[] = [UsersEffects, ServersEffects, RolesEffects, GroupsEffects, ContentsEffects, CategoriesEffects, BotEffects];

export * from './users.effects';
export * from './servers.effects';
export * from './roles.effects';
export * from './groups.effects';
export * from './contents.effects';
export * from './categories.effects';
export * from './bot.effects';
