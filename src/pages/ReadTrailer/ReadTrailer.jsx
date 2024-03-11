import { PAGE_KEYS } from '@constants';
import { readNormalizer } from '@features/trailers';
import { Descriptions } from '@features/descriptions';
import { ApiService } from '@services';
import { useMemo } from 'react';

export function ReadTrailer() {
  const api = useMemo(() => ApiService[PAGE_KEYS.TRAILERS].readById, []);

  return <Descriptions api={api} normalizer={readNormalizer} title='Причеп' />;
}
