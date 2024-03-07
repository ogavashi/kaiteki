import { PAGE_KEYS } from '@constants';
import { readNormalizer } from '@features/trucks';
import { Descriptions } from '@features/descriptions';
import { ApiService } from '@services';
import { useMemo } from 'react';

export function ReadTruck() {
  const api = useMemo(() => ApiService[PAGE_KEYS.TRUCKS].readById, []);

  return <Descriptions api={api} normalizer={readNormalizer} title='Тягач' />;
}
