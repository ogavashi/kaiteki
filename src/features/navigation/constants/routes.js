export const ROUTES = {
  LOGIN: { path: '/login', protected: false, visible: false, label: 'Login' },
  HOME: { path: '/', protected: true, visible: true, label: 'Головна' },
  DRIVERS: {
    path: '/drivers',
    protected: true,
    visible: true,
    label: 'Водії',
    children: {
      NEW_DRIVER: {
        path: '/drivers/create',
        protected: true,
        visible: false,
        label: 'Створити',
      },
      UPDATE_DRIVER: {
        path: '/drivers/update/:id',
        protected: true,
        visible: false,
        label: 'Оновити',
      },
      READ_DRIVER: {
        path: '/drivers/:id',
        protected: true,
        visible: false,
        label: 'Переглянути',
      },
    },
  },
  RIDES: {
    path: '/rides',
    protected: true,
    visible: true,
    label: 'Рейси',
    children: {
      NEW_RIDE: {
        path: '/rides/create',
        protected: true,
        visible: false,
        label: 'Створити',
      },
      UPDATE_RIDE: {
        path: '/rides/update/:id',
        protected: true,
        visible: false,
        label: 'Оновити',
      },
      READ_RIDE: {
        path: '/rides/:id',
        protected: true,
        visible: false,
        label: 'Переглянути',
      },
    },
  },
  VEHICLES: {
    path: '/vehicles',
    protected: true,
    visible: true,
    label: 'Автопарк',
    children: {
      TRUCKS: {
        path: '/vehicles/trucks',
        protected: true,
        visible: true,
        label: 'Тягачі',
        children: {
          READ_TRUCK: {
            path: '/vehicles/trucks/:id',
            protected: true,
            visible: false,
            label: 'Переглянути',
          },
          NEW_TRUCK: {
            path: '/vehicles/trucks/create',
            protected: true,
            visible: false,
            label: 'Створити',
          },
          UPDATE_TRUCK: {
            path: '/vehicles/trucks/update/:id',
            protected: true,
            visible: false,
            label: 'Оновити',
          },
        },
      },
      TRAILERS: {
        path: '/vehicles/trailers',
        protected: true,
        visible: true,
        label: 'Причепи',
        children: {
          READ_TRAILER: {
            path: '/vehicles/trailers/:id',
            protected: true,
            visible: false,
            label: 'Переглянути',
          },
          NEW_TRAILER: {
            path: '/vehicles/trailers/create',
            protected: true,
            visible: false,
            label: 'Створити',
          },
          UPDATE_TRAILER: {
            path: '/vehicles/trailers/update/:id',
            protected: true,
            visible: false,
            label: 'Оновити',
          },
        },
      },
    },
  },
};
