import { errorTexts } from '@features/error';
import * as yup from 'yup';

export const trailersSchema = yup.object().shape({
  type: yup.string().required(errorTexts.required()),
  trailerNumber: yup.string().required(errorTexts.required()),
  weight: yup.number(errorTexts.formatNumber()).required(errorTexts.required()),
});
