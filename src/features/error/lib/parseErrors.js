/* eslint-disable no-unused-vars */

import { errorHelpers } from './errorHelpers';

// {"email":{"isEmail":"email must be an email"}}

export function parseErrors(rawResponse) {
  console.log(rawResponse);
  const parsedErrors = Object.fromEntries(
    Object.entries(rawResponse).map(([fieldKey, error]) => {
      const [errorKey, errorText] = Object.entries(error)[0];

      return [fieldKey, errorHelpers[errorKey] || errorText];
    })
  );

  return parsedErrors;
}
