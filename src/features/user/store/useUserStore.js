import { LOADING_STATES } from '@constants/loadingStates';
import { ApiService } from '@services';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

export const useUserStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        loadingState: LOADING_STATES.IDLE,
        login: async (payload, notify) => {
          set(() => ({
            loadingState: LOADING_STATES.LOADING,
          }));
          try {
            const { user, token } = await ApiService.user.login(payload);
            set(() => ({ user, token, loadingState: LOADING_STATES.LOADED }));
            notify({
              type: 'error',
              message: 'Помилка!',
              description: '123123123',
            });
            notify({
              type: 'success',
              message: 'Успіх!',
              description: 'Успішно виконано вхід',
            });
          } catch (error) {
            set(() => ({
              loadingState: LOADING_STATES.ERROR,
            }));
            notify({
              type: 'error',
              message: 'Помилка!',
              description: error.message,
            });
          }
        },
        logout: () => {
          set(() => ({
            user: null,
            token: null,
          }));
        },
      }),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ user: state.user, token: state.token }),
      }
    )
  )
);
