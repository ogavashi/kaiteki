export const ROUTES = {
  LOGIN: { path: '/login', protected: false, visible: false, label: 'Login' },
  HOME: { path: '/', protected: true, visible: true, label: 'Головна' },
  ACTS: {
    path: '/acts',
    protected: true,
    visible: true,
    label: 'Акти',
    children: {
      ALL: {
        path: '/acts/all',
        protected: true,
        visible: true,
        label: 'Всі',
      },
      NEW_ACT: {
        path: '/acts/create',
        protected: true,
        visible: true,
        label: 'Створити',
      },
    },
  },
};
