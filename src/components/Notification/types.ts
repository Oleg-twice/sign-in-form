export type Position = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export type ShowNotificationArgs = {
  message: string,
  newPosition?: Position,
  newType?: NotificationType,
  showConstantly?: boolean,
  ms?: number,
}

export type NotificationFnType = (args: ShowNotificationArgs) => void;
