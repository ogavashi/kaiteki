import { useCallback, useMemo, useState } from 'react';
import { PAGE_KEYS } from '@constants';
import { ApiService } from '@services';
import { tableSchema } from '@features/rides';
import { Table, useSelectedColumns } from '@features/table';
import { ActionButtons, ActionPanel } from '@features/actionPanel';
import { ROUTES } from '@features/navigation';
import { Inputs } from '@components';
import { INPUT_NORMALIZERS } from '@lib';

export function Rides() {
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const handleRefresh = useCallback((value = true) => {
    setShouldRefresh(value);
  }, []);

  const api = useMemo(() => ApiService[PAGE_KEYS.RIDES].read, []);

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
          destination: ROUTES.RIDES.children.NEW_RIDE.path,
        },
        {
          id: 'read',
          component: ActionButtons.Read,
          destination: ROUTES.RIDES.children.READ_RIDE.path,
        },
        {
          id: 'update',
          component: ActionButtons.Update,
          destination: ROUTES.RIDES.children.UPDATE_RIDE.path,
        },
        {
          id: 'delete',
          type: 'modal',
          mode: 'delete',
          component: ActionButtons.Delete,
          api: ApiService[PAGE_KEYS.RIDES].deleteMany,
        },
      ],
      filters: [
        {
          id: 'from',
          label: 'З',
          component: Inputs.Input,
          shouldDebounce: true,
        },
        {
          id: 'to',
          label: 'До',
          component: Inputs.Input,
          shouldDebounce: true,
        },
        {
          id: 'driver',
          label: 'Водій',
          component: Inputs.Select,
          fieldProps: {
            api: ApiService[PAGE_KEYS.DRIVERS].read,
            apiById: ApiService[PAGE_KEYS.DRIVERS].readById,
            queryKey: 'driver',
            normalizer: INPUT_NORMALIZERS.selectValue,
            selectApiRecord: (record) => ({ value: record._id, label: record.fullName }),
          },
        },
        {
          id: 'track',
          label: 'Тягач',
          component: Inputs.Select,
          fieldProps: {
            api: ApiService[PAGE_KEYS.TRUCKS].read,
            apiById: ApiService[PAGE_KEYS.TRUCKS].readById,
            queryKey: 'track',
            normalizer: INPUT_NORMALIZERS.selectValue,
            selectApiRecord: (record) => ({ value: record._id, label: record.trackNumber }),
          },
        },
        {
          id: 'trailer',
          label: 'Причеп',
          component: Inputs.Select,
          fieldProps: {
            api: ApiService[PAGE_KEYS.TRAILERS].read,
            apiById: ApiService[PAGE_KEYS.TRAILERS].readById,
            queryKey: 'trailer',
            normalizer: INPUT_NORMALIZERS.selectValue,
            selectApiRecord: (record) => ({ value: record._id, label: record.trailerNumber }),
          },
        },
        {
          id: 'companyName',
          label: 'Компанія',
          component: Inputs.Select,
          fieldProps: {
            api: ApiService[PAGE_KEYS.RIDES].companies,
            normalizer: INPUT_NORMALIZERS.selectValue,
            selectApiRecord: (record) => ({ value: record, label: record }),
          },
        },
        {
          id: 'price',
          component: Inputs.Input,
          fieldProps: {
            type: 'number',
            min: 1,
            max: 1000000,
            prefix: '₴',
          },
          label: 'Ціна  ',
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
