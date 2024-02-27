/* eslint-disable no-param-reassign */
/* eslint-disable no-magic-numbers */

import { getMessage } from './getMessage';

const recursivelyReadErrors = (result, prefix, data) => {
  if (data?.constraints) {
    result[prefix] = getMessage(data.constraints);
  }

  if (data?.children?.length) {
    data.children.forEach((child) => {
      const newPrefix = prefix ? `${prefix}/${child.property}` : child.property;

      recursivelyReadErrors(result, newPrefix, child);
    });
  }
};

export function parseErrors(rawResponse) {
  const { message } = rawResponse;

  const isValid = message.every(({ constraints }) => constraints);

  if (Array.isArray(message) && !isValid) {
    const errorMessage = message[0];
    const unstructuredResult = {};
    const structuredResult = [];

    recursivelyReadErrors(unstructuredResult, '', errorMessage);

    Object.keys(unstructuredResult).forEach((complexKey) => {
      const [index, key] = complexKey.split('/');

      structuredResult[index] = {
        ...structuredResult[index],
        [key]: unstructuredResult[complexKey],
        fieldId: +index,
      };
    });

    const errors = { [errorMessage.property]: structuredResult.filter(Boolean) };

    return errors;
  }

  const errors = Object.fromEntries(
    message
      .filter(({ constraints }) => constraints)
      .map(({ property, value, constraints }) => {
        const errorMessage = getMessage(constraints);

        const propKey = value ? `${property}-${value}`.trim() : property;

        return [propKey, errorMessage];
      })
  );

  return errors;
}
