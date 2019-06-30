import { ServerStatusModel } from './server-status.model';

export interface ServerModel {
  id: string;
  name: string;
  status?: ServerStatusModel;
  thumbnailURL?: string;
}
