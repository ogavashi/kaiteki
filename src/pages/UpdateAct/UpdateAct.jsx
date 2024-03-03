import { Inputs } from '@components';
import { PAGE_KEYS } from '@constants';
import { actsSchema } from '@features/acts';
import { FormWrapper } from '@features/form';
import { ApiService } from '@services';

import dayjs from 'dayjs';
import { useMemo } from 'react';

export function UpdateAct() {
  const schema = useMemo(
    () => [
      {
        id: 'companyName',
        component: Inputs.Input,
        label: 'Назва компанії',
      },
      {
        id: 'from',
        component: Inputs.Input,
        label: 'Звідки',
      },
      {
        id: 'to',
        component: Inputs.Input,
        label: 'Куди',
      },
      {
        id: 'date',
        component: Inputs.Date,
        fieldProps: {
          defaultValue: dayjs(),
        },
        label: 'Дата',
      },
    ],
    []
  );

  const api = useMemo(() => ApiService[PAGE_KEYS.ACTS].create, []);
  const apiById = useMemo(() => ApiService[PAGE_KEYS.ACTS].readById, []);

  return <FormWrapper api={api} apiById={apiById} schema={actsSchema} formSchema={schema} />;
}
