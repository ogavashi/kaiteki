import { PAGE_KEYS } from '@constants';
import { readNormalizer } from '@features/rides';
import { Descriptions } from '@features/descriptions';
import { ApiService } from '@services';
import { useMemo } from 'react';

export function ReadRide() {
  const api = useMemo(() => ApiService[PAGE_KEYS.RIDES].readById, []);

  return <Descriptions api={api} normalizer={readNormalizer} title='Рейс' />;
}
