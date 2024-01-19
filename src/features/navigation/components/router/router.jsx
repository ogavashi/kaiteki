import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { MainLayout } from '@components';
import { Test } from '@pages';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <>Error</>,
    children: [
      {
        path: ROUTES.HOME.path,
        element: <Test />,
      },
      { path: ROUTES.ACTS.path, element: <Test /> },
    ],
  },
]);
