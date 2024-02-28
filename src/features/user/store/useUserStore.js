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
        login: (user, token) => {
          set(() => ({ user, token }));
        },
        getMe: async () => {
          set(() => ({ loadingState: LOADING_STATES.LOADING }));
          try {
            const user = await ApiService.user.me();
            set(() => ({ user }));
            set(() => ({ loadingState: LOADING_STATES.LOADED }));
          } catch (error) {
            set(() => ({ loadingState: LOADING_STATES.ERROR }));
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
        partialize: (state) => ({ token: state.token }),
      }
    )
  )
);
