import { errorTexts } from '@features/error';
import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().email(errorTexts.email()).required(errorTexts.required()),
  password: yup.string().required(errorTexts.required()),
});
