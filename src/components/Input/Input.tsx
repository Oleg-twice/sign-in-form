import React, { InputHTMLAttributes, useCallback, useState, FocusEvent, memo, Ref, useImperativeHandle } from 'react';
import cn from 'classnames';
import './Input.scss';
import { Icon } from '../Icon';

type InputComponentProps = InputHTMLAttributes<HTMLInputElement> & {
  isValid?: boolean;
  inputRef?: Ref<HTMLInputElement>;
  isDirty?: boolean;
  isInitial?: boolean;
  focusedRef: Ref<boolean>;
};

const NAME_SPACE = 'input';

const Input: React.FC<InputComponentProps> = ({
  type = 'text',
  placeholder = '',
  isValid = true,
  onFocus,
  onBlur,
  inputRef,
  onChange,
  value = '',
  className = '',
  isDirty = false,
  disabled,
  isInitial,
  focusedRef,
  ...rest
}) => {
  const [inputType, setInputType] = useState(type);
  const [isFocused, setIsFocused] = useState(false);

  useImperativeHandle(focusedRef, () => isFocused, [isFocused]);

  const togglePasswordVisibility = useCallback(() => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  }, [inputType]);

  const inputClassNames = cn(
    NAME_SPACE,
    className,
    `${NAME_SPACE}__container`,
    {
      [`${NAME_SPACE}__container--invalid`]: !isValid && !isInitial,
      [`${NAME_SPACE}__container--focus`]: isFocused,
      [`${NAME_SPACE}__container--valid`]: (isDirty || value) && isValid && !isFocused,
      [`${NAME_SPACE}__container--disabled`]: disabled
    }
  );

  const handleOnBlur = useCallback((e: FocusEvent<HTMLInputElement, Element>) => {
    onBlur?.(e);
    setIsFocused(false);
  }, [onBlur]);

  const handleOnFocus = useCallback((e: FocusEvent<HTMLInputElement, Element>) => {
    onFocus?.(e);
    setIsFocused(true);
  }, [onFocus]);

  return (
    <div className={inputClassNames}>
      <input
        {...rest}
        value={value}
        type={inputType}
        placeholder={placeholder}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onChange={onChange}
        ref={inputRef}
        disabled={disabled}
      />
      {type === 'password' && (
        <Icon className="eye-icon" name="password-eye" onClick={togglePasswordVisibility} />
      )}
    </div>
  );
};

export default memo(Input);
