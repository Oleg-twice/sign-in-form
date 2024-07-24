
import cn from 'classnames';
import { Icon } from '../Icon';
import { NotificationType, Position } from './types';
import './Notification.scss';

type NotificationProps = {
  notification: string | null,
  position: Position,
  type: NotificationType,
  closeNotification: () => void,
  className?: string,
  duration?: number,
  withProgress?: boolean,
}

const NAME_SPACE = 'notification';

const Notification = ({
  notification = null,
  position = 'top-right',
  type = 'success',
  closeNotification,
  className = '',
}: NotificationProps) => notification && (
  <div className={
    cn(NAME_SPACE,
      className,
      {
        [`${NAME_SPACE}__${type}`]: type,
        [`${NAME_SPACE}__${position}`]: position,
      }
    )}>
    <div className={`${NAME_SPACE}__textHolder`}>
      {notification}
    </div>

    <div className={`${NAME_SPACE}__actionsHolder`}>
      <Icon className={`${NAME_SPACE}__close-btn`} name="close-btn" color="#6D7881" onClick={closeNotification} width={14} height={14}/>
    </div>
  </div>
);

export default Notification;