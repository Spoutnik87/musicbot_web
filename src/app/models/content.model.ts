import { GroupModel } from './group.model';

export interface ContentModel {
  id: string;
  name: string;
  extension?: string;
  size?: number;
  media: boolean;
  thumbnail: boolean;
  contentTypeId: number;
  categoryId: number;
  serverId: string;
  groups: GroupModel[];
}
