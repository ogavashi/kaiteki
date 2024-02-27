import { useCallback, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { PAGE_KEYS } from '@constants';
import { ApiService } from '@services';
import { tableSchema } from '@features/acts';
import { Table, useSelectedColumns } from '@features/table';
import { ActionButtons, ActionPanel } from '@features/actionPanel';
import { ROUTES } from '@features/navigation';
import { Inputs } from '@components';
import { INPUT_NORMALIZERS } from '@lib';

export function Acts() {
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const handleRefresh = useCallback((value = true) => {
    setShouldRefresh(value);
  }, []);

  const api = useMemo(() => ApiService[PAGE_KEYS.ACTS].read, []);

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
          destination: ROUTES.ACTS.children.NEW_ACT.path,
        },
        {
          id: 'read',
          component: ActionButtons.Read,
          destination: ROUTES.ACTS.children.READ_ACT.path,
        },
        {
          id: 'update',
          component: ActionButtons.Update,
          destination: ROUTES.ACTS.children.UPDATE_ACT.path,
        },
        {
          id: 'delete',
          type: 'modal',
          mode: 'delete',
          component: ActionButtons.Delete,
          api: ApiService[PAGE_KEYS.ACTS].delete,
        },
      ],
      filters: [
        {
          id: 'dateFrom',
          label: 'Від',
          component: Inputs.Date,
          fieldProps: {
            defaultValue: dayjs().startOf('month'),
          },
        },
        {
          id: 'dateTo',
          label: 'До',
          component: Inputs.Date,
          fieldProps: {
            defaultValue: dayjs(),
          },
        },
        {
          id: 'company',
          label: 'Компанія',
          component: Inputs.Select,
          fieldProps: {
            api: ApiService[PAGE_KEYS.COMPANIES].read,
            apiById: ApiService[PAGE_KEYS.COMPANIES].readById,
            queryKey: 'company',
            includeAllOption: true,
            mode: 'multiple',
            style: { width: '15rem' },
            selectApiRecord: (record) => ({ value: record.id, label: record.companyName }),
            normalizer: INPUT_NORMALIZERS.selectAll,
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
