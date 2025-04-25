import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProfileActions, ProfileStore } from "./types";
import { AES } from "crypto-ts";

const key = "NDhjk142`+-g_G;.==1asmv";

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
