export const PASSWORD_ERRORS = {
  MIN_LENGTH: '8 characters or more (no spaces)',
  UPPER_AND_LOWER_CASES: 'Uppercase and lowercase letters',
  ONE_DIGIT: 'At least one digit'
};

export const PASSWORD_ERRPR_MESSAGES = Object.values(PASSWORD_ERRORS);

export const EMAIL_VALIDATION_MESSAGE = 'Enter a valid email address';

export const FIELD_IS_REQUIRED = 'Field is required';

export const FIELDS = {
  EMAIL: 'email',
  PASSWORD: 'password'
} as const;
