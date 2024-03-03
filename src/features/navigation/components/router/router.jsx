import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { AuthLayout, AuthProvider, MainLayout } from '@components';
import { Acts, CreateAct, Login, ReadAct, Test, Trucks, UpdateAct } from '@pages';

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
            path: ROUTES.TRUCKS.path,
            element: <Trucks />,
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
            element: <ReadAct />,
          },
          {
            path: ROUTES.ACTS.children.UPDATE_ACT.path,
            element: <UpdateAct />,
          },
        ],
      },
      { element: <AuthLayout />, children: [{ path: ROUTES.LOGIN.path, element: <Login /> }] },
    ],
  },
]);
