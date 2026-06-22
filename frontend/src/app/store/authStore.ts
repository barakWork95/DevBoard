import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@devboard/shared";

type AuthUser = Pick<User, "id" | "name" | "email" | "role">;

export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (user: AuthUser, accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
}

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // state
      ...initialState,
      // actions
      setAuth: (user, accessToken, refreshToken) =>
        set((state) => ({ ...state, user, accessToken, refreshToken })),
      clearAuth: () => set({ ...initialState }),
    }),
    { name: "auth-storage" },
  ),
);

export default useAuthStore;
