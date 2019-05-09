export interface ContentModel {
  id: string;
  name: string;
  groupId: string;
  extension?: string;
  size?: number;
  content: boolean;
  thumbnail: boolean;
  contentTypeId: number;
  categoryId: number;
}
