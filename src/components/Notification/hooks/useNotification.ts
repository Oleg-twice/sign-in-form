import { useState, useEffect, useCallback } from 'react';
import { NotificationType, Position, ShowNotificationArgs } from '../types';

type NotificationProps = {
  notification: string | null;
  showNotification: (args: ShowNotificationArgs) => void;
  position: Position,
  type: NotificationType,
  closeNotification: () => void,
  duration: number,
}

export const useNotification = (ms = 5000, defaultPosition: Position = 'top-left'): NotificationProps => {
  const [notification, setNotification] = useState<string | null>(null);
  const [position, setPosition] = useState<Position>(defaultPosition);
  const [type, setType] = useState<NotificationType>('success');
  const [milliseconds, setMilliseconds] = useState<number>(ms);
  const [showConstantly, setShowConstantly] = useState<boolean>(false);

  const closeNotification = useCallback(
    () => {
      setNotification(null);
    },
    []
  );

  useEffect(() => {
    if (notification && !showConstantly) {
      const timer = setTimeout(() => {
        closeNotification();
      }, milliseconds);

      return () => clearTimeout(timer);
    }
  }, [notification, milliseconds, showConstantly, closeNotification]);

  const showNotification = useCallback(({
    message,
    newPosition = 'top-right',
    newType = 'success',
    showConstantly = false,
    ms = milliseconds,
  } : ShowNotificationArgs): void => {
    setNotification(message);
    setPosition(newPosition as Position);
    setType(newType as NotificationType);
    setShowConstantly(showConstantly);
    setMilliseconds(ms);
  }, [milliseconds]);

  return { notification, showNotification, position, type, closeNotification, duration: milliseconds };
};