import { Inputs } from '@components';
import { PAGE_KEYS } from '@constants';
import { driversSchema } from '@features/drivers';
import { FormWrapper } from '@features/form';
import { ApiService } from '@services';

import { useMemo } from 'react';

export function CreateDriver() {
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
        id: 'password',
        component: Inputs.Input,
        fieldProps: {
          type: 'password',
        },
        label: 'Пароль',
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

  const api = useMemo(() => ApiService[PAGE_KEYS.DRIVERS].create, []);

  return <FormWrapper api={api} schema={driversSchema} formSchema={schema} />;
}
