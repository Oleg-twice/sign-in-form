import React, { ChangeEvent, memo, useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { InputGroup } from '../InputGroup';
import { Button } from '../Button';
import './SignUpForm.scss';
import { omit } from '../../lib/utils';
import { CONTAINS_DIGIT_REGEX, CONTAINS_UPPERCASE_LETTER_REGEX, EMAIL_VALIDATION_REGEX } from './regex';
import { PASSWORD_ERRORS, PASSWORD_ERRPR_MESSAGES, EMAIL_VALIDATION_MESSAGE, FIELD_IS_REQUIRED, FIELDS } from './constants';

type SignUpFormValues = {
  email: string;
  password: string;
}

type FormProps = {
  onSubmit: (data: SignUpFormValues, onSuccess?: () => void) => void;
  isLoading?: boolean;
}

const NAME_SPACE = 'sign-up-form';

const SignUpForm: React.FC<FormProps> = ({ onSubmit, isLoading = false }) => {
  const { control, handleSubmit, trigger, getFieldState, reset, formState: { errors, isValid, isSubmitted } } = useForm<SignUpFormValues>({
    defaultValues: {
      email: '',
      password: ''
    },
    criteriaMode: 'all',
  });

  const { password, email } = errors;

  const { emailErrors, passwordErrors } = useMemo(() => ({
    emailErrors: email?.message ? [email?.message] : [],
    passwordErrors: password?.types ? Object.keys(password?.types).map(key => password?.types?.[key]) : [],
  }), [email?.message, password?.types]);

  const onSubmitHandler = useCallback(
    (data: SignUpFormValues) => {
      if (!isValid) return;

      onSubmit(data, () => reset({ email: '', password: '' }));
    },
    [isValid, onSubmit, reset]
  );

  const validator = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    trigger(e.target.name as 'email' | 'password')
  }, [trigger])

  return (
    <form className={NAME_SPACE} onSubmit={handleSubmit(onSubmitHandler)}>
      <h1 className={`${NAME_SPACE}__title`}>Sign Up</h1>

      <div className={`${NAME_SPACE}__inputs-container`}>
        <Controller
          name={FIELDS.EMAIL}
          control={control}
          rules={{
            required: FIELD_IS_REQUIRED,
            pattern: {
              value: EMAIL_VALIDATION_REGEX,
              message: EMAIL_VALIDATION_MESSAGE,
            },
            onBlur: validator
          }}
          render={({ field }) => (
            <InputGroup
              type='text'
              placeholder="Enter your email"
              errors={emailErrors}
              isDirty={getFieldState(FIELDS.EMAIL).isDirty && getFieldState(FIELDS.EMAIL).isValidating}
              inputRef={field.ref}
              isSingleError
              disabled={isLoading}
              isSubmitted={isSubmitted}
              {...omit(field, 'ref')}
            />
          )}
        />

        <Controller
          name={FIELDS.PASSWORD}
          control={control}
          rules={{
            validate: {
              hasUpperCaseAndLowerCase: value =>
                CONTAINS_UPPERCASE_LETTER_REGEX.test(value) || PASSWORD_ERRORS.UPPER_AND_LOWER_CASES,
              hasDigit: value => CONTAINS_DIGIT_REGEX.test(value) || PASSWORD_ERRORS.ONE_DIGIT,
              minLength: value => value.length >= 8 || PASSWORD_ERRORS.MIN_LENGTH,
            },
            onChange: validator,
            onBlur: validator
          }}
          render={({ field }) => {
            return (
              <InputGroup
                type='password'
                placeholder="Create your password"
                errors={passwordErrors}
                isDirty={getFieldState(FIELDS.PASSWORD).isDirty}
                alwaysShowValidationMsgs
                inputRef={field.ref}
                messages={PASSWORD_ERRPR_MESSAGES}
                disabled={isLoading}
                isSubmitted={isSubmitted}
                {...omit(field, 'ref')}
              />
            )
          }}
        />
      </div>

      <Button text="Submit" type="submit" disabled={isLoading} />
    </form>
  )
}

export default memo(SignUpForm);