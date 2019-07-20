import { Injectable } from '@angular/core';
import { resetStores } from '@datorama/akita';
import { AuthStore } from '../auth/auth.store';
import { CategoriesStore } from '../categories/categories.store';
import { ContentTypesStore } from '../content-types/content-types.store';
import { ContentsStore } from '../contents/contents.store';
import { GroupsStore } from '../groups/groups.store';
import { MessagesStore } from '../messages/messages.store';
import { RolesStore } from '../roles/roles.store';
import { ServersStore } from '../servers/servers.store';
import { UsersStore } from '../users/users.store';
import { AppStore } from './app.store';

@Injectable()
export class AppService {
  constructor(
    private appStore: AppStore,
    private authStore: AuthStore,
    private categoriesStore: CategoriesStore,
    private contentTypesStore: ContentTypesStore,
    private contentsStore: ContentsStore,
    private groupsStore: GroupsStore,
    private messagesStore: MessagesStore,
    private rolesStore: RolesStore,
    private serversStore: ServersStore,
    private usersStore: UsersStore
  ) {}

  clearStore() {
    resetStores();
    /*this.appStore.reset();
    this.authStore.reset();
    this.categoriesStore.reset();
    this.contentTypesStore.reset();
    this.contentsStore.reset();
    this.groupsStore.reset();
    this.messagesStore.reset();
    this.rolesStore.reset();
    this.serversStore.reset();
    this.usersStore.reset();*/
  }
}
