import { createBrowserRouter } from 'react-router-dom';
import { Test } from '@pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Test />,
  },
]);
