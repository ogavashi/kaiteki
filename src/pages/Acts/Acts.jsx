import { useMemo } from 'react';
import { PAGE_KEYS } from '@constants';
import { ApiService } from '@services';
import { tableSchema } from '@features/acts';
import { Table } from '@features/table';

export function Acts() {
  const api = useMemo(() => ApiService[PAGE_KEYS.ACTS].read, []);

  return (
    <div>
      <Table api={api} tableSchema={tableSchema} />
    </div>
  );
}
