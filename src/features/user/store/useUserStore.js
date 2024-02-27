import { LOADING_STATES } from '@constants/loadingStates';
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
