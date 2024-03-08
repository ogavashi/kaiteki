import { errorTexts } from '@features/error';
import * as yup from 'yup';

export const trucksSchema = yup.object().shape({
  make: yup.string().required(errorTexts.required()),
  carModel: yup.string().required(errorTexts.required()),
  trackNumber: yup.string().required(errorTexts.required()),
  weight: yup.number(errorTexts.formatNumber()).required(errorTexts.required()),
  fuelCosts: yup.number(errorTexts.formatNumber()).required(errorTexts.required()),
  gasolineTankCapacity: yup.number(errorTexts.formatNumber()).required(errorTexts.required()),
});
