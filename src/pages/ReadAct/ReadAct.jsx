import { PAGE_KEYS } from '@constants';
import { readNormalizer } from '@features/acts';
import { Descriptions } from '@features/descriptions';
import { ApiService } from '@services';
import { useMemo } from 'react';

export function ReadAct() {
  const api = useMemo(() => ApiService[PAGE_KEYS.ACTS].readById, []);

  return <Descriptions api={api} normalizer={readNormalizer} title='Акт' />;
}
