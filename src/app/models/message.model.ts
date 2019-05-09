export interface MessageModel {
  id: string;
  type: 'success' | 'danger' | 'info';
  message: string;
}
