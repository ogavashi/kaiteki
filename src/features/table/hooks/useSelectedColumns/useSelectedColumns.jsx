import { getSelectors } from '@features/table';
import { useCallback, useMemo, useState } from 'react';

export function useSelectedColumns(selectors) {
  const [selected, setSelected] = useState([]);

  const handleSelect = useCallback((newSelected) => {
    setSelected(newSelected);
  }, []);

  const rowSelection = useMemo(
    () => getSelectors(selectors, selected, setSelected, handleSelect),
    [handleSelect, selected, selectors]
  );

  return rowSelection;
}
