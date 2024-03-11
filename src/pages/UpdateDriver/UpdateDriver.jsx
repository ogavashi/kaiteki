import { Inputs } from '@components';
import { PAGE_KEYS } from '@constants';
import { driversUpdateSchema } from '@features/drivers';
import { FormWrapper } from '@features/form';
import { ApiService } from '@services';

import { useMemo } from 'react';

export function UpdateDriver() {
  const schema = useMemo(
    () => [
      {
        id: 'fullName',
        component: Inputs.Input,
        label: `Ім'я`,
      },
      {
        id: 'email',
        component: Inputs.Input,
        label: 'Email',
      },
      {
        id: 'salaryPerOneKm',
        component: Inputs.Input,
        fieldProps: {
          type: 'number',
          min: 1,
          max: 1000,
          prefix: '₴',
        },
        label: 'Ціна за кілометр',
      },
    ],
    []
  );

  const api = useMemo(() => ApiService[PAGE_KEYS.DRIVERS].update, []);
  const apiById = useMemo(() => ApiService[PAGE_KEYS.DRIVERS].readById, []);

  return (
    <FormWrapper api={api} apiById={apiById} schema={driversUpdateSchema} formSchema={schema} />
  );
}
