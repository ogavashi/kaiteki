export const INPUT_NORMALIZERS = {
  selectAll: ({ values, options }) => {
    let selectedValues = values;

    const selectAllOption = values.includes('');

    if (selectAllOption) {
      const optionValues = options.map(({ value }) => value);

      const shouldClear = optionValues.every((value) => selectedValues.includes(value));

      selectedValues = optionValues
        .concat(selectedValues)
        .filter((value, index, self) => value !== '' && self.indexOf(value) === index);

      if (shouldClear) {
        selectedValues = selectedValues.filter((value) => !optionValues.includes(value));
      }
    }

    return selectedValues;
  },
};
