import { ContentStatusModel } from './content-status.model';

export interface ServerStatusModel {
  id: string;
  queue: ContentStatusModel[];
  playing?: ContentStatusModel;
}
