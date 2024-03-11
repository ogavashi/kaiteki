import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { AuthLayout, AuthProvider, MainLayout } from '@components';
import {
  Acts,
  CreateAct,
  CreateTrailer,
  CreateTruck,
  Login,
  ReadAct,
  ReadTrailer,
  ReadTruck,
  Test,
  Trailers,
  Trucks,
  UpdateAct,
  UpdateTrailer,
  UpdateTruck,
} from '@pages';

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
            path: ROUTES.VEHICLES.path,
            children: [
              {
                path: ROUTES.VEHICLES.children.TRUCKS.path,
                element: <Trucks />,
              },
              {
                path: ROUTES.VEHICLES.children.TRUCKS.children.READ_TRUCK.path,
                element: <ReadTruck />,
              },
              {
                path: ROUTES.VEHICLES.children.TRUCKS.children.UPDATE_TRUCK.path,
                element: <UpdateTruck />,
              },
              {
                path: ROUTES.VEHICLES.children.TRUCKS.children.NEW_TRUCK.path,
                element: <CreateTruck />,
              },
              {
                path: ROUTES.VEHICLES.children.TRAILERS.path,
                element: <Trailers />,
              },
              {
                path: ROUTES.VEHICLES.children.TRAILERS.children.READ_TRAILER.path,
                element: <ReadTrailer />,
              },
              {
                path: ROUTES.VEHICLES.children.TRAILERS.children.NEW_TRAILER.path,
                element: <CreateTrailer />,
              },
              {
                path: ROUTES.VEHICLES.children.TRAILERS.children.UPDATE_TRAILER.path,
                element: <UpdateTrailer />,
              },
            ],
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
