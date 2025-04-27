import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProfileActions, ProfileStore } from "./types";
import { AES } from "crypto-ts";

const key = "X7pL9qW3zT2rY8mB5nK4vJ6hF1cD0aE2";

export const useProfileStore = create<ProfileStore & ProfileActions>()(
  persist(
    (set) => ({
      token: "",
      setProfile: (res) => {
        const encrypted = AES.encrypt(res, key).toString();
        set({ token: encrypted });
      },
    }),
    {
      name: "profileStorage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
