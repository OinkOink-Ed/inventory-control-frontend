import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AES } from "crypto-ts";
import { AuthActions, AuthState } from "./types";

const key = "X7pL9qW3zT2rY8mB5nK4vJ6hF1cD0aE2";

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      isAuth: "",
      setAuth: () => {
        const encrypted = AES.encrypt("true", key).toString();
        set({ isAuth: encrypted });
      },
    }),
    {
      name: "authStorage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
