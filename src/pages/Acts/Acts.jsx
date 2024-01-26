import { useMemo } from 'react';
import { PAGE_KEYS } from '@constants';
import { ApiService } from '@services';
import { tableSchema } from '@features/acts';
import { Table, useSelectedColumns } from '@features/table';
import { ActionButtons, ActionPanel } from '@features/actionPanel';
import { ROUTES } from '@features/navigation';

export function Acts() {
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
          id: 'update',
          component: ActionButtons.Update,
          destination: ROUTES.ACTS.children.UPDATE_ACT.path,
        },
      ],
    }),
    []
  );

  return (
    <div>
      <ActionPanel scheme={actionPanelScheme} selectedRows={rowSelection.selectedRowKeys} />
      <Table
        api={api}
        tableSchema={tableSchema}
        handleAddOnRow={handleAddOnRow}
        rowSelection={rowSelection}
      />
    </div>
  );
}
