import { PAGE_KEYS } from '@constants';
import { readNormalizer } from '@features/drivers';
import { Descriptions } from '@features/descriptions';
import { ApiService } from '@services';
import { useMemo } from 'react';

export function ReadDriver() {
  const api = useMemo(() => ApiService[PAGE_KEYS.DRIVERS].readById, []);

  return <Descriptions api={api} normalizer={readNormalizer} title='Водій' />;
}
