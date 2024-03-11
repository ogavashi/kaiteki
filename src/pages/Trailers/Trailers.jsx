import { useCallback, useMemo, useState } from 'react';
import { PAGE_KEYS } from '@constants';
import { ApiService } from '@services';
import { tableSchema } from '@features/trailers';
import { Table, useSelectedColumns } from '@features/table';
import { ActionButtons, ActionPanel } from '@features/actionPanel';
import { ROUTES } from '@features/navigation';
import { Inputs } from '@components';
import { INPUT_NORMALIZERS } from '@lib';

export function Trailers() {
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const handleRefresh = useCallback((value = true) => {
    setShouldRefresh(value);
  }, []);

  const api = useMemo(() => ApiService[PAGE_KEYS.TRAILERS].read, []);

  const { rowSelection, handleAddOnRow } = useSelectedColumns([
    'all',
    'none',
    'inverted',
    'even',
    'odd',
  ]);

  const actionPanelScheme = useMemo(
    () => ({
      actions: [
        {
          id: 'create',
          component: ActionButtons.Create,
          destination: ROUTES.VEHICLES.children.TRAILERS.children.NEW_TRAILER.path,
        },
        {
          id: 'read',
          component: ActionButtons.Read,
          destination: ROUTES.VEHICLES.children.TRAILERS.children.READ_TRAILER.path,
        },
        {
          id: 'update',
          component: ActionButtons.Update,
          destination: ROUTES.VEHICLES.children.TRAILERS.children.UPDATE_TRAILER.path,
        },
        {
          id: 'delete',
          type: 'modal',
          mode: 'delete',
          component: ActionButtons.Delete,
          api: ApiService[PAGE_KEYS.TRAILERS].deleteMany,
        },
      ],
      filters: [
        {
          id: 'trailerNumber',
          label: 'Номер',
          component: Inputs.Input,
          shouldDebounce: true,
        },
        {
          id: 'weight',
          component: Inputs.Input,
          fieldProps: {
            type: 'number',
            min: 1,
            max: 1000000,
            prefix: 'КГ',
          },
          label: 'Вага',
          shouldDebounce: true,
        },
        {
          id: 'type',
          label: 'Тип',
          component: Inputs.Select,
          fieldProps: {
            api: ApiService[PAGE_KEYS.TRAILERS].types,
            normalizer: INPUT_NORMALIZERS.selectValue,
            selectApiRecord: (record) => ({ value: record, label: record }),
          },
        },
      ],
    }),
    []
  );

  return (
    <div>
      <ActionPanel
        scheme={actionPanelScheme}
        selectedRows={rowSelection.selectedRowKeys}
        handleRefresh={handleRefresh}
      />
      <Table
        api={api}
        tableSchema={tableSchema}
        handleAddOnRow={handleAddOnRow}
        rowSelection={rowSelection}
        shouldRefresh={shouldRefresh}
        handleRefresh={handleRefresh}
      />
    </div>
  );
}
