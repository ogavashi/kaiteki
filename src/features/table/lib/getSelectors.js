export const getSelectors = (selectors, selectedRowKeys, setSelectedRowKeys, handleSelect) => {
  if (!selectors) {
    return;
  }

  const generateSelection = (key, text, filterFunction) => ({
    key,
    text,
    onSelect: (changeableRowKeys) => {
      const newSelectedRowKeys = changeableRowKeys.filter(filterFunction);
      setSelectedRowKeys(newSelectedRowKeys);
    },
  });

  const rowSelection = {
    selectedRowKeys,
    onChange: handleSelect,
    columnWidth: 70,
    selections: selectors.map((selector) => {
      switch (selector) {
        case 'all':
          return generateSelection('all', 'Всі', () => true);
        case 'none':
          return generateSelection('none', 'Жодні', () => false);
        case 'inverted':
          return generateSelection(
            'inverted',
            'Інвертувати',
            (key) => !selectedRowKeys.includes(key)
          );
        case 'odd':
          return generateSelection('odd', 'Непарні', (_, index) => index % 2 !== 0);
        case 'even':
          return generateSelection('even', 'Парні', (_, index) => index % 2 === 0);
        default:
          return null;
      }
    }),
  };

  return rowSelection;
};
