import { Inputs } from '@components';
import { PAGE_KEYS } from '@constants';
import { ridesSchema } from '@features/rides';
import { FormWrapper } from '@features/form';
import { ApiService } from '@services';

import { useMemo } from 'react';
import { INPUT_NORMALIZERS } from '@lib';

export function CreateRide() {
  const schema = useMemo(
    () => [
      {
        id: 'from',
        component: Inputs.Input,
        label: 'З',
      },
      {
        id: 'to',
        component: Inputs.Input,
        label: 'До',
      },
      {
        id: 'price',
        component: Inputs.Input,
        fieldProps: {
          type: 'number',
          min: 1,
          max: 1000000,
          prefix: '₴',
        },
        label: 'Ціна',
      },
      {
        id: 'distance',
        component: Inputs.Input,
        fieldProps: {
          type: 'number',
          min: 1,
          max: 1000000,
          prefix: 'КМ',
        },
        label: 'Дистанція',
      },
      {
        id: 'companyName',
        label: 'Компанія',
        component: Inputs.Select,
        fieldProps: {
          api: ApiService[PAGE_KEYS.RIDES].companies,
          normalizer: INPUT_NORMALIZERS.selectValue,
          addable: true,
          selectApiRecord: (record) => ({ value: record, label: record }),
        },
      },
      {
        id: 'driver',
        label: 'Водій',
        component: Inputs.Select,
        fieldProps: {
          api: ApiService[PAGE_KEYS.DRIVERS].read,
          normalizer: INPUT_NORMALIZERS.selectValue,
          selectApiRecord: (record) => ({ value: record._id, label: record.fullName }),
        },
      },
      {
        id: 'track',
        label: 'Тягач',
        component: Inputs.Select,
        fieldProps: {
          api: ApiService[PAGE_KEYS.TRUCKS].read,
          normalizer: INPUT_NORMALIZERS.selectValue,
          selectApiRecord: (record) => ({ value: record._id, label: record.trackNumber }),
        },
      },
      {
        id: 'trailer',
        label: 'Причеп',
        component: Inputs.Select,
        fieldProps: {
          api: ApiService[PAGE_KEYS.TRAILERS].read,
          normalizer: INPUT_NORMALIZERS.selectValue,
          selectApiRecord: (record) => ({ value: record._id, label: record.trailerNumber }),
        },
      },
    ],
    []
  );

  const api = useMemo(() => ApiService[PAGE_KEYS.RIDES].create, []);

  return <FormWrapper api={api} schema={ridesSchema} formSchema={schema} />;
}
