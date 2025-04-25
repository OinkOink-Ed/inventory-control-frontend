import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AuthActions, AuthState } from "./types";
import { AES } from "crypto-ts";

const key = "NDhjk142`+-g_G;.==1asmv";

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
