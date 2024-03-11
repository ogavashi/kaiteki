import { errorTexts } from '@features/error';
import * as yup from 'yup';

export const driversSchema = yup.object().shape({
  password: yup.string().required(errorTexts.required()).min(8, errorTexts.minLength(8)),
  fullName: yup.string().required(errorTexts.required()),
  salaryPerOneKm: yup.number(errorTexts.formatNumber()).required(errorTexts.required()),
  email: yup.string().email(errorTexts.email()).required(errorTexts.required()),
});
