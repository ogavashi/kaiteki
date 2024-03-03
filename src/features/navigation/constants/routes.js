export const ROUTES = {
  LOGIN: { path: '/login', protected: false, visible: false, label: 'Login' },
  HOME: { path: '/', protected: true, visible: true, label: 'Головна' },
  TRUCKS: { path: '/trucks', protected: true, visible: true, label: 'Автопарк' },
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
