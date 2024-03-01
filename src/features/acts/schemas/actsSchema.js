import { errorTexts } from '@features/error';
import * as yup from 'yup';

export const actsSchema = yup.object().shape({
  companyName: yup.string().required(errorTexts.required()),
  from: yup.string().required(errorTexts.required()),
  to: yup.string().required(errorTexts.required()),
  date: yup.object().required(errorTexts.required()),
});
