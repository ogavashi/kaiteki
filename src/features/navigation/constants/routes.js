export const ROUTES = {
  LOGIN: { path: '/login', protected: false, visible: false, label: 'Login' },
  HOME: { path: '/', protected: true, visible: true, label: 'Головна' },
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
  ACTS: {
    path: '/acts',
    protected: true,
    visible: true,
    label: 'Акти',
    children: {
      NEW_ACT: {
        path: '/acts/create',
        protected: true,
        visible: false,
        label: 'Створити',
      },
      UPDATE_ACT: {
        path: '/acts/update/:id',
        protected: true,
        visible: false,
        label: 'Оновити',
      },
      READ_ACT: {
        path: '/acts/:id',
        protected: true,
        visible: false,
        label: 'Переглянути',
      },
    },
  },
};
