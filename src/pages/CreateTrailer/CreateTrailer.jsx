import { Inputs } from '@components';
import { PAGE_KEYS } from '@constants';
import { trailersSchema } from '@features/trailers';
import { FormWrapper } from '@features/form';
import { ApiService } from '@services';

import { useMemo } from 'react';
import { INPUT_NORMALIZERS } from '@lib';

export function CreateTrailer() {
  const schema = useMemo(
    () => [
      {
        id: 'trailerNumber',
        component: Inputs.Input,
        label: 'Номер',
      },
      {
        id: 'type',
        label: 'Тип',
        component: Inputs.Select,
        fieldProps: {
          api: ApiService[PAGE_KEYS.TRAILERS].types,
          normalizer: INPUT_NORMALIZERS.selectValue,
          selectApiRecord: (record) => ({ value: record, label: record }),
          addable: true,
        },
      },
      {
        id: 'weight',
        component: Inputs.Input,
        fieldProps: {
          type: 'number',
          min: 1,
          max: 1000000,
          prefix: 'КГ',
        },
        label: 'Вага',
      },
    ],
    []
  );

  const api = useMemo(() => ApiService[PAGE_KEYS.TRAILERS].create, []);

  return <FormWrapper api={api} schema={trailersSchema} formSchema={schema} />;
}
