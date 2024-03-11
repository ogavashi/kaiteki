import { errorTexts } from '@features/error';
import * as yup from 'yup';

export const driversUpdateSchema = yup.object().shape({
  fullName: yup.string().required(errorTexts.required()),
  salaryPerOneKm: yup.number(errorTexts.formatNumber()).required(errorTexts.required()),
  email: yup.string().email(errorTexts.email()).required(errorTexts.required()),
});
