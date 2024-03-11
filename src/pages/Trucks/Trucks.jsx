import { useCallback, useMemo, useState } from 'react';
import { PAGE_KEYS } from '@constants';
import { ApiService } from '@services';
import { tableSchema } from '@features/trucks';
import { Table, useSelectedColumns } from '@features/table';
import { ActionButtons, ActionPanel } from '@features/actionPanel';
import { ROUTES } from '@features/navigation';
import { Inputs } from '@components';
import { INPUT_NORMALIZERS } from '@lib';

export function Trucks() {
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const handleRefresh = useCallback((value = true) => {
    setShouldRefresh(value);
  }, []);

  const api = useMemo(() => ApiService[PAGE_KEYS.TRUCKS].read, []);

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
          destination: ROUTES.VEHICLES.children.TRUCKS.children.NEW_TRUCK.path,
        },
        {
          id: 'read',
          component: ActionButtons.Read,
          destination: ROUTES.VEHICLES.children.TRUCKS.children.READ_TRUCK.path,
        },
        {
          id: 'update',
          component: ActionButtons.Update,
          destination: ROUTES.VEHICLES.children.TRUCKS.children.UPDATE_TRUCK.path,
        },
        {
          id: 'delete',
          type: 'modal',
          mode: 'delete',
          component: ActionButtons.Delete,
          api: ApiService[PAGE_KEYS.TRUCKS].deleteMany,
        },
      ],
      filters: [
        {
          id: 'trackNumber',
          label: 'Номер',
          component: Inputs.Input,
          shouldDebounce: true,
        },
        {
          id: 'make',
          label: 'Марка',
          component: Inputs.Select,
          fieldProps: {
            api: ApiService[PAGE_KEYS.TRUCKS].makes,
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
