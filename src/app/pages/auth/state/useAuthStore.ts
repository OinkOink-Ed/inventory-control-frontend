import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AuthActions, AuthState } from "./types";

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      isAuth: false,
      setAuth: () => set({ isAuth: true }),
    }),
    {
      name: "authStorage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
