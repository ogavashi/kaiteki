import { Inputs } from '@components';
import { PAGE_KEYS } from '@constants';
import { trucksSchema } from '@features/trucks';
import { FormWrapper } from '@features/form';
import { ApiService } from '@services';

import { useMemo } from 'react';

export function UpdateTruck() {
  const schema = useMemo(
    () => [
      {
        id: 'make',
        component: Inputs.Input,
        label: 'Марка',
      },
      {
        id: 'carModel',
        component: Inputs.Input,
        label: 'Модель',
      },
      {
        id: 'trackNumber',
        component: Inputs.Input,
        label: 'Номер',
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
      {
        id: 'fuelCosts',
        component: Inputs.Input,
        fieldProps: {
          type: 'number',
          min: 10,
          max: 1000,
          prefix: '₴',
        },
        label: 'Витрати пального на 100 км',
      },
      {
        id: 'gasolineTankCapacity',
        component: Inputs.Input,
        fieldProps: {
          type: 'number',
          min: 10,
          max: 100000,
          prefix: 'L',
        },
        label: `О'бєм баку`,
      },
    ],
    []
  );

  const api = useMemo(() => ApiService[PAGE_KEYS.TRUCKS].update, []);
  const apiById = useMemo(() => ApiService[PAGE_KEYS.TRUCKS].readById, []);

  return <FormWrapper api={api} apiById={apiById} schema={trucksSchema} formSchema={schema} />;
}
