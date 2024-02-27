import { errorHelpers } from './errorHelpers';

export function getMessage(constraints) {
  const errorKey = Object.keys(constraints)[0];

  const error = errorKey;

  const text = constraints[errorKey];

  const helperText = errorHelpers[errorKey] ? errorHelpers[errorKey](text) : '';

  const errorMessage = `${error} ${helperText}`;

  return errorMessage;
}
