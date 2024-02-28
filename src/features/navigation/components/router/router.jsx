import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { AuthLayout, AuthProvider, MainLayout } from '@components';
import { Acts, CreateAct, Login, Test } from '@pages';

export const router = createBrowserRouter([
  {
    element: <AuthProvider />,
    children: [
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
            element: <Acts />,
          },
          {
            path: ROUTES.ACTS.children.NEW_ACT.path,
            element: <CreateAct />,
          },
          {
            path: ROUTES.ACTS.children.READ_ACT.path,
            element: <>Read</>,
          },
          {
            path: ROUTES.ACTS.children.UPDATE_ACT.path,
            element: <>Edit</>,
          },
        ],
      },
      { element: <AuthLayout />, children: [{ path: ROUTES.LOGIN.path, element: <Login /> }] },
    ],
  },
]);
