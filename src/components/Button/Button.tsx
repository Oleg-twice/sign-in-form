import { memo, ButtonHTMLAttributes } from 'react';
import cn from 'classnames';
import './Button.scss';

export interface CustomButtonProps {
  text: string,
  size?: 'lg' | 'sm',
  className?: string,
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & CustomButtonProps;

const NAME_SPACE = 'button';

export const Button: React.FC<ButtonProps> = ({
  text,
  size = 'sm',
  className,
  disabled,
  ...restButtonProps
}: ButtonProps) => {
  const classes = cn(
    NAME_SPACE,
    className,
    {
      [`${NAME_SPACE}--${size}`]: size,
      [`${NAME_SPACE}--disabled`]: disabled,
    }
  );

  return (
    <button
      className={classes}
      disabled={disabled}
      {...restButtonProps}
    >
      {text}
    </button>
  );
}

export default memo(Button);
