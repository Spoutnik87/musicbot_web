import { GroupModel } from './group.model';

export interface ContentModel {
  id: string;
  name: string;
  description: string;
  thumbnailSize?: number;
  contentTypeId: number;
  categoryId: number;
  serverId: string;
  groups: GroupModel[];
  thumbnailURL?: string;
  /**
   * Track duration in millis
   */
  duration: number;
  localMetadata?: {
    mimeType: string;
    mediaSize: number;
  };
  youtubeMetadata?: {
    videoId: string;
  };
}
