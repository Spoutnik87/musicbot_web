import { ContentStatusModel } from './content-status.model';

export interface ServerStatusModel {
  // Unix timestamp in millis
  date: number;
  id: string;
  queue: ContentStatusModel[];
  playing?: ContentStatusModel;
}
