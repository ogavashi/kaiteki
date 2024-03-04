export const ROUTES = {
  LOGIN: { path: '/login', protected: false, visible: false, label: 'Login' },
  HOME: { path: '/', protected: true, visible: true, label: 'Головна' },
  VEHICLES: {
    path: '/vehicles',
    protected: true,
    visible: true,
    label: 'Автопарк',
    children: {
      TRUCKS: { path: '/vehicles/trucks', protected: true, visible: true, label: 'Тягачі' },
      TRAILERS: { path: '/vehicles/trailers', protected: true, visible: true, label: 'Причепи' },
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
