import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { AuthLayout, MainLayout } from '@components';
import { Login, Test } from '@pages';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <>Error</>,
    children: [
      {
        path: ROUTES.HOME.path,
        element: <Test />,
      },
      {
        path: ROUTES.ACTS.path,
        children: [
          { path: ROUTES.ACTS.children.ALL.path, element: <Test /> },
          { path: ROUTES.ACTS.children.NEW_ACT.path, element: <>New act</> },
        ],
      },
    ],
  },
  { element: <AuthLayout />, children: [{ path: ROUTES.LOGIN.path, element: <Login /> }] },
]);
