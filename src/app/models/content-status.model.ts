export interface ContentStatusModel {
  uid: string;
  id: string;
  name: string;
  initiator: {
    id: string;
    nickname: string;
  };
  /**
   * Track duration in millis
   */
  duration: number;
  /**
   * Unix timestamp in millis
   */
  startTime?: number;
  /**
   * Current track position in millis
   */
  position?: number;
  paused?: boolean;
}
