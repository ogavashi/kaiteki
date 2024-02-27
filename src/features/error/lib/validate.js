import { getErrors } from './getErrors';

/* eslint-disable no-sync */
export function validate(schema, data) {
  try {
    schema.validateSync(data, { abortEarly: false });
  } catch (err) {
    return getErrors(err, data);
  }
}
