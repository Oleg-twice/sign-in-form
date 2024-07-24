import { useCallback, useState } from 'react';
import { SignUpForm } from '../../components/SignUpForm';
import './SignUpPage.scss';
import { useNotification, Notification } from '../../components/Notification';
import { emulateServerRequest } from '../../lib/utils';

const NAME_SPACE = 'sign-up-page';

const SignUpPage: React.FC = () => {
  const {
    position,
    showNotification,
    notification,
    type,
    closeNotification,
  } = useNotification();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async (data: { email: string; password: string }, onSuccess?: () => void) => {
      setIsLoading(true)
      try {
        const res = await emulateServerRequest();

        if (onSuccess) {
          onSuccess();
        }

        showNotification({ message: res.data });
        console.log('submitted with: ', data);
      } catch(err) {
        showNotification({ message: 'Something went wrong!', newType: 'error' });
      } finally {
        setIsLoading(false);
      }
    },
    [showNotification]
  );

  return (
    <div className={NAME_SPACE}>
      <SignUpForm onSubmit={onSubmit} isLoading={isLoading} />
      <Notification position={position} notification={notification} type={type} closeNotification={closeNotification} />
    </div>
  );
}

export default SignUpPage;
