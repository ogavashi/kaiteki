import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { AuthLayout, AuthProvider, MainLayout } from '@components';
import {
  CreateDriver,
  CreateTrailer,
  CreateTruck,
  Drivers,
  Login,
  ReadDriver,
  ReadTrailer,
  ReadTruck,
  Test,
  Trailers,
  Trucks,
  UpdateDriver,
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
            path: ROUTES.DRIVERS.path,
            element: <Drivers />,
          },
          {
            path: ROUTES.DRIVERS.children.NEW_DRIVER.path,
            element: <CreateDriver />,
          },
          {
            path: ROUTES.DRIVERS.children.READ_DRIVER.path,
            element: <ReadDriver />,
          },
          {
            path: ROUTES.DRIVERS.children.UPDATE_DRIVER.path,
            element: <UpdateDriver />,
          },
        ],
      },
      { element: <AuthLayout />, children: [{ path: ROUTES.LOGIN.path, element: <Login /> }] },
    ],
  },
]);
