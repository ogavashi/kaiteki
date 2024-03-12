import { errorTexts } from '@features/error';
import * as yup from 'yup';

export const ridesSchema = yup.object().shape({
  from: yup.string().required(errorTexts.required()),
  to: yup.string().required(errorTexts.required()),
  distance: yup.number(errorTexts.formatNumber()).required(errorTexts.required()),
  companyName: yup.string().required(errorTexts.required()),
  driver: yup.string().required(errorTexts.required()),
  track: yup.string().required(errorTexts.required()),
  trailer: yup.string().required(errorTexts.required()),
  price: yup.number(errorTexts.formatNumber()).required(errorTexts.required()),
});
