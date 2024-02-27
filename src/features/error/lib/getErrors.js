function getNumber(value) {
  const rx = /\[(-?\d+)\]/;

  return Number(value.match(rx)?.[1]);
}

/*
Function is designed to take two arguments:
yup validation errors and originalData which was validated, and returns a parsed error.
It can be either an array of objects or single object, based on original data format.

If the originalData is an array, the function loops through each error and
extracts the relevant information such as the field name, field id, and error message.
It then creates an error object that groups the errors by field id and field name.
If the originalData is a single object, the function creates an error object that
groups the errors by field name.

*/

export function getErrors(errors, originalData) {
  if (errors.inner.length === 0) {
    return;
  }

  let parsedErrors;

  if (Array.isArray(originalData)) {
    parsedErrors = [];

    for (let i = 0; i < errors.inner.length; i++) {
      const { path, message } = errors.inner[i];

      const pathSegments = path.split('.');
      const mainFieldId = getNumber(pathSegments[0]);
      const mainFieldName = pathSegments[1].split('[')[0];
      const innerFieldId = getNumber(pathSegments[1]);
      const innerFieldName = pathSegments?.[2];

      const existingErrorIndex = parsedErrors.findIndex(({ fieldId }) => fieldId === mainFieldId);
      const innerId = Number.isInteger(innerFieldId);

      const newError = innerId ? [{ fieldId: innerFieldId, [innerFieldName]: message }] : message;

      if (existingErrorIndex >= 0) {
        const errorObj = parsedErrors[existingErrorIndex];

        parsedErrors[existingErrorIndex][mainFieldName] = errorObj[mainFieldName]
          ? [...errorObj[mainFieldName], ...newError]
          : newError;
      } else {
        const error = { fieldId: mainFieldId, [mainFieldName]: newError };

        parsedErrors.push(error);
      }
    }

    return parsedErrors;
  }

  parsedErrors = {};

  for (let i = 0; i < errors.inner.length; i++) {
    const { path, message } = errors.inner[i];

    const pathSegments = path.split('.');
    const mainFieldName = pathSegments[0].split('[')[0];
    const innerFieldId = getNumber(pathSegments[0]);
    const innerFieldName = pathSegments?.[1];

    const innerId = Number.isInteger(innerFieldId);

    const newError = innerId ? [{ fieldId: innerFieldId, [innerFieldName]: message }] : message;

    parsedErrors[mainFieldName] =
      parsedErrors[mainFieldName] && innerId
        ? [...parsedErrors[mainFieldName], ...newError]
        : newError;
  }

  return parsedErrors;
}
