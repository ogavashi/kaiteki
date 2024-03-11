import { useCallback, useMemo, useState } from 'react';
import { PAGE_KEYS } from '@constants';
import { ApiService } from '@services';
import { tableSchema } from '@features/drivers';
import { Table, useSelectedColumns } from '@features/table';
import { ActionButtons, ActionPanel } from '@features/actionPanel';
import { ROUTES } from '@features/navigation';
import { Inputs } from '@components';

export function Drivers() {
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const handleRefresh = useCallback((value = true) => {
    setShouldRefresh(value);
  }, []);

  const api = useMemo(() => ApiService[PAGE_KEYS.DRIVERS].read, []);

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
          destination: ROUTES.DRIVERS.children.NEW_DRIVER.path,
        },
        {
          id: 'read',
          component: ActionButtons.Read,
          destination: ROUTES.DRIVERS.children.READ_DRIVER.path,
        },
        {
          id: 'update',
          component: ActionButtons.Update,
          destination: ROUTES.DRIVERS.children.UPDATE_DRIVER.path,
        },
        {
          id: 'delete',
          type: 'modal',
          mode: 'delete',
          component: ActionButtons.Delete,
          api: ApiService[PAGE_KEYS.DRIVERS].deleteMany,
        },
      ],
      filters: [
        {
          id: 'fullName',
          label: `Ім'я`,
          component: Inputs.Input,
          shouldDebounce: true,
        },
        {
          id: 'email',
          label: `Email`,
          component: Inputs.Input,
          shouldDebounce: true,
        },
        {
          id: 'salaryPerOneKm',
          component: Inputs.Input,
          fieldProps: {
            type: 'number',
            min: 0,
            max: 1000,
            prefix: '₴',
          },
          label: 'Ціна за кіломтер',
          shouldDebounce: true,
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
