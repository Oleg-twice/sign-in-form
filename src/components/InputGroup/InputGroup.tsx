import React, { InputHTMLAttributes, memo, Ref, useRef } from 'react';
import cn from 'classnames';
import { Input } from '../Input';
import { ValidationMessages } from '../ValidationMessages';
import './InputGroup.scss';
import { ValidateResult } from 'react-hook-form';

type InputGroupProps = InputHTMLAttributes<HTMLInputElement> & {
  messages?: string[];
  errors?: string[] | ValidateResult[];
  label?: string;
  alwaysShowValidationMsgs?: boolean;
  isDirty?: boolean;
  inputRef?: Ref<HTMLInputElement>
  inputClassName?: string;
  isSingleError?: boolean;
  isSubmitted?: boolean;
};

const NAME_SPACE = 'input-group';

const InputGroup: React.FC<InputGroupProps> = ({
  messages = [],
  errors,
  id,
  label,
  isDirty = false,
  alwaysShowValidationMsgs = false,
  inputRef,
  className,
  inputClassName = '',
  isSingleError = false,
  disabled,
  isSubmitted = false,
  ...restInputProps
}) => {
  const focusedRef = useRef(false);


  return (
    <div className={cn(NAME_SPACE, className)}>
      {label && <label htmlFor={id}>{label}</label>}
      <Input
        id={id}
        type="text"
        inputRef={inputRef}
        className={cn(`${NAME_SPACE}__input`, inputClassName)}
        isValid={!errors?.length}
        isDirty={isDirty}
        disabled={disabled}
        isInitial={!isSubmitted}
        focusedRef={focusedRef}
        {...restInputProps}
      />
      <ValidationMessages
        className={cn(`${NAME_SPACE}__error`, { [`${NAME_SPACE}__single-error`]: isSingleError })}
        messages={messages}
        errors={errors}
        alwaysShow={alwaysShowValidationMsgs}
        isInitial={!isDirty && !restInputProps.value}
        focusedAndNotSubmitted={focusedRef.current && !isSubmitted}
      />
    </div>
  );
}

export default memo(InputGroup);
