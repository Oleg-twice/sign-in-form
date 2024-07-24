import React, { memo } from 'react';
import cn from 'classnames';
import './ValidationMessages.scss';
import { ValidateResult } from 'react-hook-form';

type ValidationMessagesProps = {
  alwaysShow?: boolean;
  messages?: string[];
  errors?: string[]  | ValidateResult[];
  isInitial?: boolean;
  className?: string;
  focusedAndNotSubmitted?: boolean;
};

const NAME_SPACE = 'validation-messages';

const ValidationMessages: React.FC<ValidationMessagesProps> = ({
  alwaysShow = false,
  messages,
  errors = [],
  isInitial = true,
  className = '',
  focusedAndNotSubmitted = false
}) => {
  return (
    <div className={cn(`${NAME_SPACE}__container`, className)}>
      {(alwaysShow ? messages : errors)?.map((message, index) => {
        const classes = alwaysShow ? cn(
          NAME_SPACE,
          {
            [`${NAME_SPACE}--valid`]: !isInitial && !errors.includes(message),
            [`${NAME_SPACE}--invalid`]: !focusedAndNotSubmitted && errors.includes(message),
            [`${NAME_SPACE}--initial`]: isInitial
          }
        ) : cn(NAME_SPACE, `${NAME_SPACE}--invalid`)

        return (
          <div key={index} className={classes}>
            {message}
          </div>
        );
      })}
    </div>
  );
};

export default memo(ValidationMessages);
