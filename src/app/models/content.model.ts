import { GroupModel } from './group.model';

export interface ContentModel {
  id: string;
  name: string;
  description: string;
  mimeType?: string;
  mediaSize?: number;
  thumbnailSize?: number;
  media: boolean;
  thumbnail: boolean;
  contentTypeId: number;
  categoryId: number;
  serverId: string;
  groups: GroupModel[];
  thumbnailURL?: string;
  /**
   * Track duration in millis
   */
  duration: number;
}
